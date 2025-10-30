# Biomedical Named Entity Recognizer (NER)

Esta es una aplicación web de interfaz (frontend) construida con Next.js diseñada para el **Reconocimiento de Entidades Nombradas (NER) en textos biomédicos**.

La aplicación permite a los usuarios pegar o escribir texto médico y enviar una solicitud a un servicio de backend (API) para su análisis. Los resultados se muestran resaltando las entidades encontradas (**Químico** y **Enfermedad**) directamente en el texto y en una lista detallada.

## Características

* **Análisis de Texto Interactivo:** Un área de texto para que los usuarios ingresen el contenido a analizar.
* **Texto Anotado:** Muestra el texto original con las entidades reconocidas (`Chemical`, `Disease`) resaltadas con colores distintivos.
* **Lista de Entidades:** Enumera todas las entidades encontradas, mostrando su tipo (ej. "Disease") y el puntaje de confianza del modelo.
* **Leyenda:** Indica claramente qué color corresponde a cada tipo de entidad.

## Stack Tecnológico

[![Stack Tecnológico](https://skillicons.dev/icons?i=nextjs,ts,tailwind,query&theme=light)](https://skillicons.dev)


## Backend Request

* **Endpoint Esperado:** La aplicación está configurada para hacer peticiones `POST` a un endpoint `/predict`.
* **URL Base:** Por defecto, intentará conectarse a `http://localhost:8000`.
* **Configuración:** Puedes cambiar la URL base de la API creando un archivo `.env.local` en la raíz del proyecto y definiendo la variable `NEXT_PUBLIC_API_BASE_URL`:

    ```.env.local
    NEXT_PUBLIC_API_BASE_URL=[https://tu-api-backend.com](https://tu-api-backend.com)
    ```

* **Formato de la API:**
    * **Request (`POST /predict`):** El frontend envía un JSON con el siguiente formato:
        ```json
        {
          "text": "Cidofovir is used to treat CMV retinitis in patients with AIDS. The drug has shown significant efficacy in reducing viral load."
        }
        ```
    * **Response (Respuesta esperada):** El backend debe responder con un JSON que contenga un arreglo de entidades bajo la clave `predictions`:
        ```json
        {
            "predictions": [
                {
                    "entity_group": "Chemical",
                    "score": 0.998,
                    "word": "Cidofovir",
                    "start": 0,
                    "end": 9
                },
                {
                    "entity_group": "Disease",
                    "score": 0.975,
                    "word": "CMV retinitis",
                    "start": 28,
                    "end": 41
                },
                {
                    "entity_group": "Disease",
                    "score": 0.995,
                    "word": "AIDS",
                    "start": 59,
                    "end": 63
                }
            ]
        }
        ```

