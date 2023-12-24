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
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.clients
    OWNER to postgres;