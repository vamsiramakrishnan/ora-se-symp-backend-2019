/* User SESYM creation */
/* To be run as Admin User only */
create user sesym identified by Oracle12345#;
grant dwrole to sesym;
grant unlimited tablespace to sesym;
commit;

/* Grant Privileges to SESYM for SQL Developer Access */
BEGIN
   ORDS_ENABLE_SCHEMA(
     p_enabled => TRUE,
     p_schema => 'sesym',
     p_url_mapping_type => 'BASE_PATH',
     p_url_mapping_pattern => 'sesym',
     p_auto_rest_auth => TRUE
   );
   COMMIT;
END;
/
/* Ending the Grant Privileges */

/* Use this URL to login to SQL Developer SESYM https://ygwrq2w5zhiyr4k-sesymp2019.adb.eu-frankfurt-1.oraclecloudapps.com/ords/sesym/sign-in/?r=_sdw/&username=sesym */
