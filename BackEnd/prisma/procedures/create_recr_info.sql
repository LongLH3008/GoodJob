
CREATE OR REPLACE PROCEDURE create_recruitment_information(
    p_cv_id TEXT,
    p_recr_id TEXT,
    actions TEXT
)
LANGUAGE plpgsql
AS $$


DECLARE
    cv_record RECORD;
    recr_record RECORD;
    existing_record RECORD;
BEGIN
    -- Query CV record based on import_or_create option
    IF actions = 'import' THEN
        SELECT * INTO cv_record FROM "CV_import" WHERE id = p_cv_id;
    ELSE
        SELECT * INTO cv_record FROM "CV" WHERE id = p_cv_id;
    END IF;

    -- Throw error if CV record not found
    IF NOT FOUND THEN
        RAISE EXCEPTION 'Cv not found';
    END IF;

    -- Query recruitment record
    SELECT * INTO recr_record FROM "Recruitment" WHERE id = p_recr_id;

    -- Throw error if recruitment record not found
    IF NOT FOUND THEN
        RAISE EXCEPTION 'Recr not found';
    END IF;

    -- Check if recruitment information already exists
    IF actions = 'import' THEN
        SELECT * INTO existing_record FROM "Recruitment_Information" WHERE file_id = cv_id AND recr_id = p_recr_id;
    ELSE
        SELECT * INTO existing_record FROM "Recruitment_Information" WHERE cv_id = cv_id AND recr_id = p_recr_id;
    END IF;

    -- Throw error if recruitment information already exists
    IF FOUND THEN
        RAISE EXCEPTION 'This Cv already apply for this recruitment';
    END IF;

    -- Insert new recruitment information record
    IF actions = 'import' THEN
        INSERT INTO "Recruitment_Information" (recr_id, file_id)
        VALUES (p_recr_id, p_cv_id);
    ELSE
        INSERT INTO "Recruitment_Information" (recr_id, cv_id)
        VALUES (p_recr_id, p_cv_id);
    END IF;

EXCEPTION
    WHEN others THEN
        RAISE EXCEPTION 'Failed to create recruitment information: %', SQLERRM;
END;

$$;