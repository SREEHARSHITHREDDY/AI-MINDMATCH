-- Update all unconfirmed users to be confirmed
UPDATE auth.users 
SET email_confirmed_at = NOW(), 
    confirmation_token = NULL,
    email_change_confirm_status = 1
WHERE email_confirmed_at IS NULL;