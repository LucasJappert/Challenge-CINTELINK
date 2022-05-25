-- CREAMOS BASE
IF DB_ID('Cintelink') IS NULL
	BEGIN
		CREATE DATABASE Cintelink
		PRINT 'Base Cintelink creada!';
	END
GO

USE Cintelink;

-- CREAMOS USUARIO PARA LOGUEARNOS AL SERVER
IF SUSER_ID('Cintelink') IS NULL
	BEGIN
		CREATE LOGIN Cintelink WITH PASSWORD = '12341234';
        GO
        EXEC master..sp_addsrvrolemember @loginame = N'Cintelink', @rolename = N'sysadmin';
		PRINT 'Usuario Cintelink (pass 12341234) creado!';
	END

-- CREAMOS TABLAS
IF (NOT EXISTS(SELECT TOP 1 * FROM sys.tables WHERE [name] = 'Tag'))
    BEGIN
        CREATE TABLE Tag
        (
            Id int NOT NULL PRIMARY KEY IDENTITY,
            [Name] varchar(200) NOT NULL UNIQUE,
            CreationDate datetime NOT NULL DEFAULT GETDATE(),
            CanceledDate datetime NULL
        )
		PRINT 'Tabla Tag creada!';
    END
GO

IF (NOT EXISTS(SELECT TOP 1 * FROM sys.tables WHERE [name] = 'Notification'))
    BEGIN
        CREATE TABLE [Notification]
        (
            Id int NOT NULL PRIMARY KEY IDENTITY,
            Title varchar(200) NOT NULL DEFAULT '',
            [Message] varchar(1000) NOT NULL,
            IdTag int NOT NULL,
			DateToSend datetime NOT NULL,
            CreationDate datetime NOT NULL DEFAULT GETDATE(),
            CanceledDate datetime NULL,
			CONSTRAINT FK_Notification_IdTag FOREIGN KEY (IdTag) REFERENCES Tag(Id)
        )
		PRINT 'Tabla Notification creada!';
    END
GO

IF (NOT EXISTS(SELECT TOP 1 * FROM sys.tables WHERE [name] = 'User'))
    BEGIN
        CREATE TABLE [User]
        (
            Id int NOT NULL PRIMARY KEY IDENTITY,
            Nick varchar(200) NOT NULL UNIQUE,
            Pass varchar(200) NOT NULL,
            Rol tinyint default 0,
            CreationDate datetime NOT NULL DEFAULT GETDATE(),
            CanceledDate datetime NULL
        )
		PRINT 'Tabla User creada!';
    END
GO
INSERT INTO [User] (Nick, Pass, Rol, CreationDate, CanceledDate)
VALUES('ADMIN', '1234', 99, getdate(), null);

IF (NOT EXISTS(SELECT TOP 1 * FROM sys.tables WHERE [name] = 'NotificationUser'))
    BEGIN
        CREATE TABLE NotificationUser
        (
            Id int NOT NULL IDENTITY,
            IdNotification int NOT NULL,
            IdUser int NOT NULL,
            SentDate datetime NULL,
            ReadingDate datetime NULL,
            CreationDate datetime NOT NULL DEFAULT GETDATE(),
            CanceledDate datetime NULL,
			CONSTRAINT PK_NotificationUser_IdNotification_IdUser PRIMARY KEY(IdNotification, IdUser),
			CONSTRAINT FK_NotificationUser_IdNotification FOREIGN KEY (IdNotification) REFERENCES [Notification](Id),
			CONSTRAINT FK_NotificationUser_IdUser FOREIGN KEY (IdUser) REFERENCES [User](Id)
        )
		PRINT 'Tabla NotificationUser creada!';
    END
GO

IF (NOT EXISTS(SELECT TOP 1 * FROM sys.tables WHERE [name] = 'UserTag'))
    BEGIN
        CREATE TABLE UserTag
        (
            Id int NOT NULL IDENTITY,
            IdUser int NOT NULL,
            IdTag int NOT NULL,
            CreationDate datetime NOT NULL DEFAULT GETDATE(),
            CanceledDate datetime NULL,
			CONSTRAINT PK_UserTag_IdUser_IdTag PRIMARY KEY(IdUser, IdTag),
			CONSTRAINT FK_UserTag_IdUser FOREIGN KEY (IdUser) REFERENCES [User](Id),
			CONSTRAINT FK_UserTag_IdTag FOREIGN KEY (IdTag) REFERENCES Tag(Id)
        )
		PRINT 'Tabla UserTag creada!';
    END
GO
