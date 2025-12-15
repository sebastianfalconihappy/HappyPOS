interface LoginResponse {
  token: string;
  user: {
    username: string;
    role: string;
  };
}

export async function login(
  username: string,
  password: string
): Promise<LoginResponse> {

  // Simulación de backend
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (username === "admin" && password === "1234") {
        resolve({
          token: "fake-jwt-token",
          user: {
            username: "admin",
            role: "ADMIN",
          },
        });
      } else {
        reject(new Error("Credenciales incorrectas"));
      }
    }, 1000);
  });
}
