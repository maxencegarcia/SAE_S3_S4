DROP TABLE IF EXISTS reservation;
DROP TABLE IF EXISTS prestataire;
DROP TABLE IF EXISTS evenement;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
    IDuser INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(255) NOT NULL,
    mail VARCHAR(255) NOT NULL UNIQUE
);



CREATE TABLE evenement (
    idevent INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(255) NOT NULL,
    type VARCHAR(255) NOT NULL,
    image VARCHAR(255),
    date_debut DATE NOT NULL,
    date_fin DATE NOT NULL
);

CREATE TABLE prestataire (
    IDpresta INT AUTO_INCREMENT PRIMARY KEY,
    login VARCHAR(255) NOT NULL,
    mdp VARCHAR(255) NOT NULL,
    mail VARCHAR(255) NOT NULL UNIQUE,
    acces VARCHAR(255) NOT NULL,
    idevent INT NOT NULL,
    FOREIGN KEY (idevent) REFERENCES evenement(idevent)
);

CREATE TABLE reservation (
    IDreservation INT AUTO_INCREMENT PRIMARY KEY,
    IDuser INT NOT NULL,
    idevent INT NOT NULL,
    date_reservation DATE NOT NULL,
    FOREIGN KEY (IDuser) REFERENCES users(IDuser),
    FOREIGN KEY (idevent) REFERENCES evenement(idevent)
);

INSERT INTO users (nom, mail) VALUES
('Alice Durand', 'alice@example.com'),
('Bruno Martin', 'bruno@example.com'),
('Claire Petit', 'claire@example.com');

INSERT INTO evenement (nom, type, image, date_debut, date_fin) VALUES
('Soirée cinéma', 'film', NULL, '2026-07-10', '2026-07-10'),
('Atelier web', 'informatique', 'test.jpg', '2026-08-01', '2026-08-03'),
('Conférence tech', 'informatique', NULL, '2026-09-15', '2026-09-15');

INSERT INTO prestataire (login, mdp, mail, acces, idevent) VALUES
('max', 'mdp', 'max@example.com', 'orga', 1),
('orgaadmin', 'admin123', 'orga@example.com', 'orga', 1),
('videoPro', 'password_hash', 'video@example.com', 'presta', 1),
('webDev', 'password_hash', 'webdev@example.com', 'presta', 2);

INSERT INTO reservation (IDuser, idevent, date_reservation) VALUES
(1, 1, '2026-07-01'),
(2, 2, '2026-07-20'),
(3, 3, '2026-09-01');

