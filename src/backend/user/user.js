import supabase from "../supabase";

export async function getUser() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;

  return user;
}

export async function getUserFromDatabase(userId) {
  if (!userId) return;

  const { data: user } = await supabase
    .from("users")
    .select("*")
    .eq("id", userId)
    .single();

  return user;
}

export async function signUp({ email, password, username }) {
  const { data: authData, error: signUpError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        username,
      },
    },
  });

  if (signUpError) {
    throw new Error(signUpError.message);
  }

  const user = authData.user;

  if (!user) {
    throw new Error("User could not be created. Please check Supabase Auth settings.");
  }

  if (Array.isArray(user.identities) && user.identities.length === 0) {
    const existingProfile = await getProfileByEmail(email);

    if (existingProfile) {
      throw new Error("EMAIL_ALREADY_REGISTERED");
    }

    throw new Error("SIGNUP_NEEDS_LOGIN");
  }

  const userData = {
    id: user.id,
    email,
    username,
  };

  const { data, error: insertError } = await supabase
    .from("users")
    .insert([userData])
    .select()
    .single();

  if (insertError) {
    if (insertError.code === "23503") {
      const existingProfile = await getProfileByEmail(email);

      if (existingProfile) {
        throw new Error("EMAIL_ALREADY_REGISTERED");
      }

      throw new Error("PROFILE_LINK_FAILED");
    }

    throw new Error(insertError.message);
  }

  return data;
}

async function getProfileByEmail(email) {
  const { data } = await supabase
    .from("users")
    .select("id")
    .eq("email", email)
    .maybeSingle();

  return data;
}

export async function signIn({ email, password }) {
  const { data: user, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  return user;
}

export async function logout() {
  const { data: user, error } = await supabase.auth.signOut();

  if (error) throw new Error(error.message);

  return user;
}

export async function fetchUsers() {
  try {
    const { data, error } = await supabase.from("users").select("*");

    if (error) {
      console.error("Error:", error.message);
    } else {
      return data;
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
}

export async function updateRoleOnLogin() {
  const { data: session } = supabase.auth.getSession();

  if (session) {
    const accessToken = session.access_token || session.token;

    const { error: updateError } = await supabase.auth.update({
      access_token: accessToken,
      role: "admin",
    });

    if (updateError) {
      return { error: updateError };
    }
  }

  return null;
}
