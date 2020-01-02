# Simple Twitch - Backend (En desarrollo)

**Sevidor (En desarrollo)**: https://rocky-forest-64018.herokuapp.com/

**Descripción**: Backend para una versión simplificada de [Twitch](https://www.twitch.tv/directory). Utiliza MongoDB para almacenar los datos de canales y categorias.

**Características**:
* API
    * /channels
        * GET :
            * / : Obtener todos los canales
            ```
            [{
                "image": {
                    "data": {
                        "type": "Buffer",
                        "data": [
                                255,
                                216,
                                255...]
                    }
                },
                "preview": {
                    "data": {
                        "type": "Buffer",
                        "data": [
                                255,
                                216,
                                255...]
                    }
                },              
                "name": "Channel2",
                
            }, ...]
            ```
            * /:channelName : Obtener un canal por su nombre
            ```
            {
                "image": {
                    "data": {
                        "type": "Buffer",
                        "data": [
                                255,
                                216,
                                255...]
                    }
                },
                "preview": {
                    "data": {
                        "type": "Buffer",
                        "data": [
                                255,
                                216,
                                255...]
                    }
                },              
                "name": "Channel2",
                
            }
            ```
        * POST :
            * / : Crear un nuevo canal
                * name : Nombre del canal
                * image : Logotipo del canal
                * preview : Imagen del contenido del canal
    * /categories
        * GET :
            * / : Obtener todas las categorias
            ```
            [{
                "image": {
                    "data": {
                        "type": "Buffer",
                        "data": [
                                255,
                                216,
                                255...]
                    },
                    "contentType": "image/jpeg"
                },
                "name": "League of Legends"
            }, ...]
            ```
            * /:categoryName : Obtener logotipo de una categoria por su nombre

        * POST :
            * / : Crear una nueva categoria
                name : Nombre de la categoria
                categoryImage : Logotipo de la categoria

**Entorno de desarrollo**:
* **Sistema operativo:** Windows 10 64 bits
* **Node:** 12.11.1
* **MongoDB** 
