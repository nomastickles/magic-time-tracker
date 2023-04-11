USER=$1
HOST=$2

CSS_FILE=$(ls -tpr ./build/static/css/main.*.css | tail -n 1)
JS_FILE=$(ls -tpr ./build/static/js/main.*.js | tail -n 1)
TTF_FILE=$(ls -tpr ./build/static/media/digital-7.*.ttf | tail -n 1)
JS_FILENAME=$(echo $JS_FILE | grep "main.*$" -o)
CSS_FILENAME=$(echo $CSS_FILE | grep "main.*$" -o)

sed -i "" -e "s/main.*.js/$JS_FILENAME/" flask_template.html
sed -i "" -E "s/main.*.css/$CSS_FILENAME/g" flask_template.html

scp $JS_FILE $CSS_FILE "$USER@$HOST:/home/$USER/magic-time-tracker/backend/static/"
scp $TTF_FILE "$USER@$HOST:/home/$USER/magic-time-tracker/backend/static/media/"
scp flask_template.html "$USER@$HOST:/home/$USER/magic-time-tracker/backend/templates/index.html"
