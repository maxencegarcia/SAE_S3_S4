DROP TABLE IF EXISTS reservation;
DROP TABLE IF EXISTS prestataire;
DROP TABLE IF EXISTS organisateur;
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
    plan VARCHAR(255) NOT NULL,
    description TEXT,
    date_debut DATE NOT NULL,
    date_fin DATE NOT NULL
);

CREATE TABLE organisateur (
    IDorga INT AUTO_INCREMENT PRIMARY KEY,
    login VARCHAR(255) NOT NULL UNIQUE,
    mdp VARCHAR(255) NOT NULL,
    mail VARCHAR(255) NOT NULL UNIQUE,
    idevent INT NOT NULL,
    FOREIGN KEY (idevent) REFERENCES evenement(idevent)
);

CREATE TABLE prestataire (
    IDpresta INT AUTO_INCREMENT PRIMARY KEY,
    login VARCHAR(255) NOT NULL UNIQUE,
    mdp VARCHAR(255) NOT NULL,
    mail VARCHAR(255) NOT NULL UNIQUE,
    idevent INT NOT NULL,
    presentation TEXT,
    image VARCHAR(255),
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

INSERT INTO evenement (nom, type, image, plan, description, date_debut, date_fin) VALUES
('Soirée cinéma', 'film', NULL, 'cinamaplan.jpg', 'une soirée cool pour voir des film sympatique pour pas tres chère', '2026-07-10', '2026-07-10'),
('Atelier web', 'informatique', 'test.jpg', 'concertplan.jpg', 'Atelier de création web', '2026-08-01', '2026-08-03'),
('Conférence tech', 'informatique', NULL, 'techplan.jpg', 'Conférence sur les dernières technologies', '2026-09-15', '2026-09-15');

-- pour hashage faut pas forgot de verif que c'est bien 2b sinon c'est pas le bon c du php je crois
INSERT INTO organisateur (login, mdp, mail, idevent) VALUES
-- mot de passe = mdp 
('max', '$2b$10$v9itJ.TLkd2o0Gt4zhpsQOOfGb9gfhSgj3vyprr8DngvFiB8giu.O', 'max@example.com', 1),
('bycriptorga', '$2b$10$v9itJ.TLkd2o0Gt4zhpsQOOfGb9gfhSgj3vyprr8DngvFiB8giu.O', 'by@gmail', 1),
-- mot de passe = admin123
('orgaadmin', '$2b$10$lDTVsSoBfXICVcrpm9qVJe1toA1/WVp9OC2A76oro2Bdbzrgiq0wi', 'orga@example.com', 1);


INSERT INTO prestataire (login, mdp, mail, idevent, presentation, image) VALUES
-- mot de passe = mdp 
('presta', '$2b$10$v9itJ.TLkd2o0Gt4zhpsQOOfGb9gfhSgj3vyprr8DngvFiB8giu.O', 'video@example.com', 1, NULL, NULL),
('bycript', '$2b$10$v9itJ.TLkd2o0Gt4zhpsQOOfGb9gfhSgj3vyprr8DngvFiB8giu.O', 'by@gmail', 1, NULL, NULL),
-- mot de passe = webdev123
('webDev', '$2b$10$iEVPrqiuVWxc9Xl4ELONrOhwCmCDBE.pnIxC8nR10tn3soYbWLfQq', 'webdev@example.com', 2, NULL, NULL);

INSERT INTO reservation (IDuser, idevent, date_reservation) VALUES
(1, 1, '2026-07-01'),
(2, 2, '2026-07-20'),
(3, 3, '2026-09-01');