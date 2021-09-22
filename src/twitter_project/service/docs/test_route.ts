//сделать доку для auth на swagger пи минимуму описывать роуты

export const swLogin = {
    "summary": "update the user info",
    "tags": [
        "login"
    ],
    "parameters": [
        {
            "name": "login",
            "in": "body",
            "schema": {
                "type": "string"
            },
            "required": true
        }
    ],
    "requestBody": {
        "content": {
            "application/json": {
                "schema": {

                }
            }
        }
    },
    "responses": {
        "200": {
            "description": "Done"
        },
        "default": {
            "description": "Error message"
        }
    }
}