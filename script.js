// Métodos HTTP
const httpMethods = ["GET", "POST", "PUT", "PATCH", "DELETE"];

const httpMethodsList = document.getElementById("http-methods");
const additionalDataInput = document.getElementById("additional-data");
const idInput = document.getElementById("id-input");
const apiResponse = document.getElementById("api-response");

httpMethods.forEach((method) => {
  const li = document.createElement("li");
  li.textContent = method;
  li.addEventListener("click", () => {
    makeRequest(method);
    scrollToResponse();
  });
  httpMethodsList.appendChild(li);
});

// Realizar petición a la API
function makeRequest(method) {
  let url = "https://jsonplaceholder.typicode.com/posts";
  const additionalData = additionalDataInput.value.trim();
  const id = idInput.value.trim();

  let requestOptions = {
    method: method,
  };

  switch (method) {
    case "POST":
      requestOptions.headers = {
        "Content-Type": "application/json",
      };
      requestOptions.body = additionalData;
      break;
    case "PUT":
    case "PATCH":
      if (id) {
        url = `${url}/${id}`;
        requestOptions.headers = {
          "Content-Type": "application/json",
        };
        requestOptions.body = additionalData;
      } else {
        alert("Ingrese el ID");
        return;
      }
      break;
    case "DELETE":
      if (id) {
        url = `${url}/${id}`;
      } else {
        alert("Ingrese el ID a eliminar");
        return;
      }
      break;
  }

  // Mostrar indicador de carga
  const loadingIndicator = document.getElementById("loading-indicator");
  loadingIndicator.classList.remove("hidden");

  fetch(url, requestOptions)
    .then((response) => response.json())
    .then((data) => {
      const pre = document.createElement("pre");
      pre.textContent = JSON.stringify(data, null, 2);
      apiResponse.innerHTML = "";
      apiResponse.appendChild(pre);
    })
    .catch((error) => {
      const p = document.createElement("p");
      p.textContent = `Error: ${error}`;
      apiResponse.innerHTML = "";
      apiResponse.appendChild(p);
    })
    .finally(() => {
      // Ocultar indicador de carga
      loadingIndicator.classList.add("hidden");
    });
}

// Función para hacer scroll suave a la respuesta de la API
function scrollToResponse() {
  const responseSection = document.querySelector(".response-section");
  responseSection.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}
