-- Table: public.auditLogs

-- DROP TABLE IF EXISTS public."auditLogs";

CREATE TABLE IF NOT EXISTS public."auditLogs"
(
    id uuid NOT NULL,
    "entityName" character varying(255) COLLATE pg_catalog."default" NOT NULL,
    "entityId" character varying(255) COLLATE pg_catalog."default" NOT NULL,
    "tenantId" uuid,
    action character varying(32) COLLATE pg_catalog."default" NOT NULL,
    "createdById" uuid,
    "createdByEmail" character varying(255) COLLATE pg_catalog."default",
    "timestamp" timestamp with time zone NOT NULL,
    "values" json NOT NULL,
    CONSTRAINT "auditLogs_pkey" PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."auditLogs"
    OWNER to postgres;