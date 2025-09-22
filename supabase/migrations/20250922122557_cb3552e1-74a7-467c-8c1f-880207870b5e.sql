-- Disable email confirmation requirement
UPDATE auth.config 
SET enable_signup = true, 
    enable_confirmations = false;

-- Also update any existing unconfirmed users to be confirmed
UPDATE auth.users 
SET email_confirmed_at = created_at,
    confirmed_at = created_at
WHERE email_confirmed_at IS NULL;