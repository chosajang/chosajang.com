### 프로젝트 설정
- vue 전역 설정
 > yarn global add @vue/cli

- vue 3.0 + tailwind css 2.x 설치시 장애 발생
 > Error: PostCSS plugin autoprefixer requires PostCSS 8. Update PostCSS or downgrade this plugin
 > https://tailwindcss.com/docs/installation 
```
npm uninstall tailwindcss postcss autoprefixer
npm install tailwindcss@npm:@tailwindcss/postcss7-compat @tailwindcss/postcss7-compat postcss@^7 autoprefixer@^9
```


- tailwindcss 2.x 호환성 설치
 > yarn add tailwindcss@npm:@tailwindcss/postcss7-compat postcss@^7 autoprefixer@^9
 
 
