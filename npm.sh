#!/usr/bin/env bash
(
#Check if running on NixOs and set enviroments before running npm
if type -P nixos-version &> /dev/null;
then
    echo 'On NixOs: Setting environment variables.';
    case "$1" in
        "install" | "ci" )
            export CYPRESS_INSTALL_BINARY=0;;
        *)
            Cypress="$(type -P Cypress)";
            if [ $? -eq 0 ]
            then
                export CYPRESS_RUN_BINARY="$Cypress"
            else
                echo "Cypress binary is not installed!";
                exit 1
            fi;;
    esac
else
    echo 'Not NixOs: Run npm as usual.';
fi

npm "$@";
)
