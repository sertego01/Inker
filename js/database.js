// Funciones para interactuar con Firestore

// Guardar datos de usuario
function saveUserData(userId, userData) {
    return db.collection('users').doc(userId).set(userData);
}

// Obtener datos de usuario
function getUserData(userId) {
    return db.collection('users').doc(userId).get();
}

// Actualizar datos de usuario
function updateUserData(userId, updatedData) {
    return db.collection('users').doc(userId).update(updatedData);
}

// Guardar datos de tatuador
function saveArtistData(userId, artistData) {
    return db.collection('artists').doc(userId).set(artistData);
}

// Obtener datos de tatuador
function getArtistData(userId) {
    return db.collection('artists').doc(userId).get();
}

// Obtener todos los tatuadores
function getAllArtists(limit = 10) {
    return db.collection('artists').limit(limit).get();
}

// Tatuadoreses por estilo
function getArtistsByStyle(style, limit = 10) {
    return db.collection('artists')
        .where('styles', 'array-contains', style)
        .limit(limit)
        .get();
}

// Tatuadoreses por ubicación (búsqueda básica por ciudad)
function getArtistsByLocation(location, limit = 10) {
    return db.collection('artists')
        .where('city', '==', location.toLowerCase())
        .limit(limit)
        .get();
}

// Guardar una cita
function saveAppointment(appointmentData) {
    return db.collection('appointments').add({
        ...appointmentData,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });
}

// Obtener citas de usuario
function getUserAppointments(userId) {
    return db.collection('appointments')
        .where('userId', '==', userId)
        .orderBy('date', 'desc')
        .get();
}

// Obtener citas de tatuador
function getArtistAppointments(artistId) {
    return db.collection('appointments')
        .where('artistId', '==', artistId)
        .orderBy('date', 'desc')
        .get();
}

// Subir imagen a Storage
function uploadImage(file, path) {
    return storage.ref(path).put(file);
}

// Obtener URL de imagen
function getImageURL(path) {
    return storage.ref(path).getDownloadURL();
}