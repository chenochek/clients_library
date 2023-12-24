-- Database: clients

-- DROP DATABASE IF EXISTS clients;

CREATE DATABASE clients
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'English_United States.1252'
    LC_CTYPE = 'English_United States.1252'
    LOCALE_PROVIDER = 'libc'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;

ALTER DATABASE clients
    SET "TimeZone" TO 'Europe/Minsk';

    -- Table: public.clients

    -- DROP TABLE IF EXISTS public.clients;

    CREATE TABLE IF NOT EXISTS public.clients
    (
        fio text COLLATE pg_catalog."default",
        mobile text COLLATE pg_catalog."default",
        agreement text COLLATE pg_catalog."default",
        id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 999999999 CACHE 1 ),
        date_birth timestamp with time zone,
        CONSTRAINT clients_pkey PRIMARY KEY (id)
            INCLUDE(id)
    );

    TABLESPACE pg_default;

    ALTER TABLE IF EXISTS public.clients
        OWNER to postgres;



        -- Table: public.visits

        -- DROP TABLE IF EXISTS public.visits;

        CREATE TABLE IF NOT EXISTS public.visits
        (
            id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 999999999 CACHE 1 ),
            client_id integer NOT NULL,
            date timestamp with time zone,
            duration text COLLATE pg_catalog."default",
            price text COLLATE pg_catalog."default",
            comment text COLLATE pg_catalog."default",
            photo text COLLATE pg_catalog."default",
            CONSTRAINT visits_pkey PRIMARY KEY (id)
                INCLUDE(id),
            CONSTRAINT fk_clients_visits FOREIGN KEY (client_id)
                REFERENCES public.clients (id) MATCH SIMPLE
                ON UPDATE NO ACTION
                ON DELETE CASCADE
                NOT VALID
        )

        TABLESPACE pg_default;

        ALTER TABLE IF EXISTS public.visits
            OWNER to postgres;
        -- Index: fki_а

        -- DROP INDEX IF EXISTS public."fki_а";

        CREATE INDEX IF NOT EXISTS "fki_а"
            ON public.visits USING btree
            (client_id ASC NULLS LAST)
            TABLESPACE pg_default;
