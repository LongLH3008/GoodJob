CREATE OR REPLACE PROCEDURE update_recruitment_information(
    p_employer_id text,
    p_recr_info_id bigInt,
    p_action recr_info_status_t -- assuming recr_info_status_t is a string type
)
LANGUAGE plpgsql
AS $$

DECLARE
    recr_info_record RECORD;
    employer_record RECORD;
    recr_id text;
    recr_list text[];
BEGIN
    -- Query recruitment information record
    SELECT * INTO recr_info_record FROM "Recruitment_Information" WHERE id = p_recr_info_id;

    -- Throw error if recruitment information record not found
    IF NOT FOUND THEN
        RAISE EXCEPTION 'Recr info not found';
    END IF;

    -- Query employer record
    SELECT * INTO employer_record FROM "User" u
    JOIN "Company" c ON u.id = c.employer_id
    JOIN "Recruitment" r ON c.id = r.company_id
    WHERE u.id = p_employer_id AND u.user_role = 'Employer';

    -- Throw error if employer not found
    IF NOT FOUND THEN
        RAISE EXCEPTION 'Employer not found';
    END IF;

    -- Extract recr_id from recr_info_record
    recr_id := recr_info_record.recr_id;

    -- Extract recr_list from employer_record
    SELECT ARRAY(SELECT id FROM "Recruitment" WHERE company_id = employer_record.company_id) INTO recr_list;

    -- Check permission
    IF NOT recr_id = ANY(recr_list) THEN
        RAISE EXCEPTION 'You don''t have permission to another company''s recruitment';
    END IF;

    -- Update recruitment information status
    UPDATE "Recruitment_Information"
    SET recr_info_status = p_action
    WHERE id = p_recr_info_id;
END;

$$;
