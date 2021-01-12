### 개발환경 설정
- nodejs, yarn 설치
 
- vue 전역 설정
 > yarn global add @vue/cli

- vue 3.0 설치
 > vue create chosajang.com
```
Vue CLI v4.5.10
? Please pick a preset:
  Default ([Vue 2] babel, eslint)
> Default (Vue 3 Preview) ([Vue 3] babel, eslint)
  Manually select features
```

- vue 3.0 + tailwind css 2.x 설치시 장애 발생
 > Error: PostCSS plugin autoprefixer requires PostCSS 8. Update PostCSS or downgrade this plugin
 >
 > 해결방법 참고 : https://tailwindcss.com/docs/installation 
```
PostCSS 7 compatibility build

As of v2.0, Tailwind CSS depends on PostCSS 8. 
Because PostCSS 8 is only a few months old, many other tools in the ecosystem haven't updated yet, which means you might see an error like this in your terminal after installing Tailwind and trying to compile your CSS:

 > Error: PostCSS plugin tailwindcss requires PostCSS 8.

To help bridge the gap until everyone has updated, we also publish a PostCSS 7 compatibility build under the compat channel on npm.

If you run into the error mentioned above, uninstall Tailwind and re-install using the compatibility build instead:

 # npm uninstall tailwindcss postcss autoprefixer
 # npm install tailwindcss@npm:@tailwindcss/postcss7-compat @tailwindcss/postcss7-compat postcss@^7 autoprefixer@^9
```

- tailwindcss 2.x 호환성 빌드를 사용하여 재설치
 > yarn remove tailwindcss postcss autoprefixer
 >
 > yarn add tailwindcss@npm:@tailwindcss/postcss7-compat postcss@^7 autoprefixer@^9
 
 - tailwind 설정 파일 생성
  > npx tailwindcss init
  > 
  > 
  
