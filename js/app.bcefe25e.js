(function(e){function t(t){for(var i,s,n=t[0],l=t[1],c=t[2],d=0,p=[];d<n.length;d++)s=n[d],o[s]&&p.push(o[s][0]),o[s]=0;for(i in l)Object.prototype.hasOwnProperty.call(l,i)&&(e[i]=l[i]);u&&u(t);while(p.length)p.shift()();return r.push.apply(r,c||[]),a()}function a(){for(var e,t=0;t<r.length;t++){for(var a=r[t],i=!0,n=1;n<a.length;n++){var l=a[n];0!==o[l]&&(i=!1)}i&&(r.splice(t--,1),e=s(s.s=a[0]))}return e}var i={},o={app:0},r=[];function s(t){if(i[t])return i[t].exports;var a=i[t]={i:t,l:!1,exports:{}};return e[t].call(a.exports,a,a.exports,s),a.l=!0,a.exports}s.m=e,s.c=i,s.d=function(e,t,a){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},s.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(s.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)s.d(a,i,function(t){return e[t]}.bind(null,i));return a},s.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="/";var n=window["webpackJsonp"]=window["webpackJsonp"]||[],l=n.push.bind(n);n.push=t,n=n.slice();for(var c=0;c<n.length;c++)t(n[c]);var u=l;r.push([0,"chunk-vendors"]),a()})({0:function(e,t,a){e.exports=a("56d7")},"29d8":function(e,t,a){},"3dfd":function(e,t,a){"use strict";var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{attrs:{id:"app"}},[a("router-view")],1)},o=[],r={name:"app"},s=r,n=a("2877"),l=Object(n["a"])(s,i,o,!1,null,null,null);t["a"]=l.exports},4360:function(e,t,a){"use strict";var i=a("2b0e"),o=a("2f62"),r=a("630a"),s=function(){return{user:JSON.parse(localStorage.getItem(r["c"].user.local))||{},status:localStorage.getItem(r["c"].token.local)?"auth":"",token:localStorage.getItem(r["c"].token.local)||"",modals:[],feature:[],playlistId:null,locale:localStorage.getItem(r["c"].locale.local)||"ru",theme:localStorage.getItem(r["c"].theme.local)||""}},n={isLoggedIn:function(e){return!!e.token},authStatus:function(e){return e.status},getLocale:function(e){return e.locale}},l={auth_request:function(e){e.status="loading"},auth_success:function(e,t){var a=t.token,i=t.user;e.status="auth",e.token=a,e.user=i},auth_error:function(e){e.status="error"},logout:function(e){e.status="",e.token="",e.user={}},accountTab:function(e,t){e.accountTab=t},playlistId:function(e,t){e.playlistId=t}},c=a("a17e"),u={login:function(e){var t=e.commit;return new Promise(function(e,a){t("auth_request");var i=!0;c["a"].post("/user/login",r["a"]).then(function(a){var o=a.data.body,s=o.token;c["a"].defaults.headers.common[r["c"].token.header]=s,i&&(localStorage.setItem(r["c"].token.local,s),localStorage.setItem(r["c"].user.local,JSON.stringify(o))),t("auth_success",{token:s,user:o}),e(a)}).catch(function(e){t("auth_error"),a(e)})})},register:function(e,t){var a=e.commit;return new Promise(function(e,i){a("auth_request"),c["a"].post(r["b"].user.SIGNUP,t).then(function(t){var i=t.data.body,o=i.token;c["a"].defaults.headers.common[r["c"].token.header]=o,localStorage.setItem(r["c"].token.local,o),localStorage.setItem(r["c"].user.local,JSON.stringify(i)),a("auth_success",{token:o,user:i}),e(t)}).catch(function(e){a("auth_error",e),i(e)})})},logout:function(e){var t=e.commit;return new Promise(function(e){t("logout"),delete c["a"].defaults.headers.common[r["c"].token.header],localStorage.removeItem(r["c"].token.local),localStorage.removeItem(r["c"].user.local),e()})},setAccountTab:function(e,t){var a=e.commit;a("accountTab",t)},setIdPlaylist:function(e,t){var a=e.commit;a("playlistId",t)},changeTheme:function(e,t){var a=t?"dark":"";e.state.theme=a,localStorage.setItem(r["c"].theme.local,a)}};i["a"].use(o["a"]);var d=function(){return new o["a"].Store({state:s(),getters:n,mutations:l,actions:u})};t["a"]=d},"56d7":function(e,t,a){"use strict";a.r(t),function(e){a("cadf"),a("551c"),a("f751"),a("097d");var t=a("2b0e"),i=a("3dfd"),o=a("9883"),r=a("4360"),s=a("a17e"),n=a("d3a4"),l=a("e813"),c=a.n(l),u=a("630a");a("29d8");window.$=a("1157"),localStorage.getItem(u["c"].deviceId.local)?s["a"].defaults.headers.common[u["c"].deviceId.header]=localStorage.getItem(u["c"].deviceId.local):c.a.get(function(e){var t=c.a.x64hash128(e.map(function(e){return e.value}).join(),31);s["a"].defaults.headers.common[u["c"].deviceId.header]=t,localStorage.setItem(u["c"].deviceId.local,t)}),s["a"].interceptors.response.use(function(e){return e},function(e){return new Promise(function(){401===e.response.status&&Object(r["a"])().dispatch("logout").then(function(){Object(r["a"])().dispatch("login")})})}),t["a"].prototype.$http=s["a"],t["a"].config.productionTip=!1,new t["a"]({el:"#app",router:o["a"],store:r["a"],i18n:n["a"],render:function(e){return e(i["a"])}}).$mount("#app")}.call(this,a("1157"))},"630a":function(e,t,a){"use strict";a.d(t,"a",function(){return i}),a.d(t,"b",function(){return o}),a.d(t,"c",function(){return r});var i={email:"s2s2s2@gmail.com",password:"s2s2s2"},o={baseURL:"https://api.stellium.bigdig.com.ua/v1",user:{LOGIN:"/user/login",SIGNUP:"/user/signup"},sets:{GET_MY:"/library/set",DELETE:"/library/set-delete",UPDATE:"/library/set-update"},browse:{CATEGORIES:"/feature/feature-filter"},search:{FEATURE_TYPE:"/feature/list",FEATURE_MOOD:"/feature/value",PLAYLISTS:"/search/playlist"},playlist:{MEDIA:"/playlist/media"},profile:{CHANGE_PASSWORD:"/user/change-password"}},r={user:{local:"user"},token:{header:"x-api-key",local:"_x-api-key"},deviceId:{header:"device-id",local:"_did"},volume:{local:"_player-volume"},locale:{local:"_locale"},theme:{local:"_theme"}}},6558:function(e,t,a){"use strict";(function(e){var i=a("ba56"),o=a.n(i),r=a("630a"),s=a("7caf");t["a"]={name:"MainPage",components:{},data:function(){return{loading:!1,playing:!1,sets:[],set:{},muted:!1,progress:{playlistsProgress:0,tracksProgress:0,playlistIndex:0,trackIndex:0,trackCurrentTime:"00:00"},playlistDurations:[],trackList:[],trackDurations:[],media:{duration:"00:00:00"},nativeSupport:!1}},methods:{initPlayer:function(t){var a=this;a.player=a.$refs.audio,o.a.isSupported()?(a.volume=0===parseFloat(localStorage.getItem(r["c"].volume.local))?0:parseFloat(localStorage.getItem(r["c"].volume.local))||100,a.hls=new o.a(t),a.hls.attachMedia(a.player),a.hls.on(o.a.Events.ERROR,function(e,t){var i=t.type;i===o.a.ErrorTypes.MEDIA_ERROR&&a.retry()})):document.getElementById("audio").canPlayType("application/vnd.apple.mpegurl")&&(a.nativeSupport=!0),e(a.player).on("ended",function(){a.playNextTrack()})},playSet:function(e,t,a){this.set=e,this.progress.playlistsProgress=0,this.progress.playlistIndex=0,this.playPlaylist(this.progress.playlistIndex,t,a)},playPlaylistAsSet:function(e){this.playSet({duration:e.duration,id:4444e12,playlists:[e],title:""})},playStreamlist:function(e){this.playSet({duration:e.playlist.duration,id:4444e12,playlists:[e.playlist],title:""},e.currentPlayMediaPosition-1,e.currentPlayMediaSecond)},playPlaylist:function(e,t,a){var i=this;void 0!==i.set.playlists[e]?(i.playlist=i.set.playlists[e],i.$http.post("/playlist/media",{id:i.playlist.id,limit:555}).then(function(e){200===e.status&&(i.trackList=e.data.body["list"],i.progress.trackIndex=t,i.playMedia(i.trackList[t],a),i.trackDurations=[])})):i.showErrorMessage("empty playlist")},playMedia:function(e,t){var a=this;a.media=e,this.nativeSupport?(a.player.src=a.media.m3U8Link,a.player.addEventListener("loadedmetadata",function(){t&&(a.player.currentTime=t),a.player.play(),a.playing=!0,a.loading=!1},{once:!0})):(a.hls.loadSource(a.media.m3U8Link),a.hls.attachMedia(this.player),a.hls.once(o.a.Events.MANIFEST_PARSED,function(){t&&(a.player.currentTime=t),a.player.play(),a.playing=!0,a.loading=!1}))},playNextTrack:function(){this.hls.detachMedia(),this.progress.trackIndex+1<this.trackList.length?this.playMedia(this.trackList[++this.progress.trackIndex]):this.progress.playlistIndex+1<this.set.playlists.length&&self.playPlaylist(0,0,0)},play:function(){this.playing?(this.playing=!1,this.player.pause()):(this.getStreamlistAndGo(),this.playing=!0)},showErrorMessage:function(){},destroy:function(){this.hls.destroy(),e(this.player).off("timeupdate"),this.player.pause(),this.playing=!1},retry:function(){this.destroy(),this.initPlayer(s["a"]),this.playMedia(this.media)},getStreamlistAndGo:function(){var e=this;this.loading=!0,this.$http.post("/streamlist/list",{id:[4],limit:555}).then(function(t){e.playStreamlist(t.data.body.list[0])})}},mounted:function(){var e=this;this.initPlayer(s["a"]),this.$store.dispatch("logout").then(function(){e.$store.dispatch("login").then(function(){}).catch(function(){})})}}}).call(this,a("1157"))},"7caf":function(e,t,a){"use strict";t["a"]={autoStartLoad:!0,startPosition:-1,debug:!1,defaultAudioCodec:void 0,initialLiveManifestSize:1,maxBufferLength:30,maxMaxBufferLength:600,maxBufferSize:6e7,maxBufferHole:.5,lowBufferWatchdogPeriod:.5,highBufferWatchdogPeriod:3,nudgeOffset:.1,nudgeMaxRetry:3,maxFragLookUpTolerance:.25,liveSyncDurationCount:3,liveMaxLatencyDurationCount:1/0,enableWorker:!0,enableSoftwareAES:!0,manifestLoadingTimeOut:1e4,manifestLoadingMaxRetry:1,manifestLoadingRetryDelay:1e3,manifestLoadingMaxRetryTimeout:64e3,startLevel:void 0,levelLoadingTimeOut:1e4,levelLoadingMaxRetry:4,levelLoadingRetryDelay:1e3,levelLoadingMaxRetryTimeout:64e3,fragLoadingTimeOut:2e4,fragLoadingMaxRetry:6,fragLoadingRetryDelay:1e3,fragLoadingMaxRetryTimeout:64e3,startFragPrefetch:!1,fpsDroppedMonitoringPeriod:5e3,fpsDroppedMonitoringThreshold:.2,appendErrorMaxRetry:3,enableWebVTT:!0,enableCEA708Captions:!0,stretchShortVideoTrack:!1,maxAudioFramesDrift:1,forceKeyFrameOnDiscontinuity:!0,abrEwmaFastLive:3,abrEwmaSlowLive:9,abrEwmaFastVoD:3,abrEwmaSlowVoD:9,abrEwmaDefaultEstimate:5e5,abrBandWidthFactor:.95,abrBandWidthUpFactor:.7,abrMaxWithRealBitrate:!1,maxStarvationDelay:4,maxLoadingDelay:4,minAutoBitrate:0,emeEnabled:!1,widevineLicenseUrl:void 0}},9883:function(e,t,a){"use strict";var i=a("2b0e"),o=a("8c4f"),r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"layout"},[a("div",{staticClass:"layout__content"},[a("div",{attrs:{id:"main"}},[a("main",{staticClass:"main"},[a("section",{staticClass:"section section_full top"},[e._m(0),a("div",{staticClass:"content content_top"},[a("h3",{staticClass:"title title_lg"},[e._v("Testing.")]),a("img",{staticClass:"title_logo",attrs:{src:"/img/avt.png",alt:""}}),a("h5",{staticClass:"title title_sm"},[e._v("!")]),a("button",{staticClass:"btn btn_slg",on:{click:e.play}},[a("span",{staticClass:"btn__text"},[e._v("\n                                Test\n                                "),a("span",{directives:[{name:"show",rawName:"v-show",value:!e.loading,expression:"!loading"}],staticClass:"play",class:{playing:e.playing}}),a("span",{directives:[{name:"show",rawName:"v-show",value:e.loading,expression:"loading"}],staticClass:"loader"})])])])])]),a("audio",{ref:"audio",attrs:{id:"audio"}})])])])},s=[function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"top-img"},[a("div",{staticClass:"top-img__img top-img__img_main"}),a("div",{staticClass:"top-img__img top-img__img_w"}),a("div",{staticClass:"top-img__img top-img__img_w2"}),a("div",{staticClass:"top-img__text"})])}],n=a("6558"),l=n["a"],c=a("2877"),u=Object(c["a"])(l,r,s,!1,null,null,null),d=u.exports,p=[{path:"/",name:"Main",component:d}];i["a"].use(o["a"]);var m=new o["a"]({mode:"history",routes:p});t["a"]=m},a17e:function(e,t,a){"use strict";var i=a("bc3a"),o=a.n(i),r=a("630a"),s=o.a.create();s.defaults.baseURL=r["b"].baseURL,s.defaults.headers.common["Content-Type"]="application/json",s.defaults.headers.common["Version"]="1.0.0",s.defaults.headers.common["Accept-Language"]=localStorage.getItem(r["c"].locale.local)||"ru",localStorage.getItem(r["c"].token.local)&&(s.defaults.headers.common[r["c"].token.header]=localStorage.getItem(r["c"].token.local)),t["a"]=s},d3a4:function(e,t,a){"use strict";var i=a("2b0e"),o=a("a925"),r=a("630a"),s={login:"Войти",register:"Регистрация",registerNow:"Зарегистрироваться",tryForFree:"Попробовать бесплатно",order:"Заказать",createAccount:"Создать аккаунт",newSet:"Новый сет",play:"Воспроизвести",extend:"Продлить",save:"Сохранить",send:"Отправить",create:"Создать",forEstablishments:"Для заведений",s1_title:"Аудио оформление",s1_subtitle:"Вашего бизнеса",s1_slogan:"Твой бизнес заиграет по-новому с помощью Stellium music Business",s2_title:"Музыка для заведений",s2_customers:{title:"Музыка в магазине делает покупателей более удовлетворенными",improvements:["повышает отзывчивость и продуктивность персонала","делает покупателей более удовлетворенными","повышает конкурентоспособность бизнеса"]},s2_hotel:{title:"Музыкальный фон в отеле делает гостей более расслабленными и довольными",improvements:["делает их более расслабленными и довольными","способствует потреблению большего количества блюд","гостей хотели бы слышать музыку в местах общего пользования"]},s2_discipline:{title:"Музыкальный фон улучшает трудовую дисциплину",improvements:["улучшает трудовую дисциплину","поднимает коллективу настроение","идут на работу с хорошим настроением"]},s2_sampleSets:{restaurants:"Рестораны, кафе, бары",grocery:"Супермаркеты, магазины продуктов",malls:"Торговые центры, магазины одежды, шоу-румы",fitness:"Фитнес-центры, spa, салоны красоты",auto:"Автосалоны, АЗС, дилерские центры",kids:"Детские праздники и мероприятия",dance:"Дискотеки, вечеринки",parks:"Парки, зоны отдыха"},s3_title:"Вы лучшие, и это слышно!",s3_features:[{title:"Только легальный контент",description:"Мы составим за вас отчётность и сделаем все необходимые отчисления в РАО и ВОИС"},{title:"Просто и эффективно",description:"Простые и эффективные инструменты для персонального подбора музыки"},{title:"Личный кабинет",description:"Удобный личный кабинет, возможность использования на любых устройствах"},{title:"Персональное оформление",description:"Персональное брендирование вашего потокового музыкального оформления"},{title:"Авторские плейлисты",description:"Создание авторских плейлистов по вашему запросу, управление рекламным расписанием при анонсировании ваших событий"},{title:"Музыкальная коллекция всех жанров",description:"Большая музыкальная база всех стилей и направлений"},{title:" Профессиональная команда",description:"Музыкальные редакторы и диджеи с большим опытом работы в музыкальной индустрии"},{title:"Поддержка 24/7",description:"Юридическая и техническая поддержка, консультации, помощь при приобретении звукового оборудования"}],footerCaption:"Музыкальный стриминг сервис",cookies:["Наш сайт использует ","(файлы с данными о прошлых посещениях сайта) для персонализации сервисов и удобства пользователей. Мы серьезно относимся к защите персональных данных — ознакомьтесь с ","условиями и принципами их обработки."],reg_title:"Регистрация",reg_company:"Название компании",reg_email:"Email",reg_phone:"Номер телефона",reg_password:"Пароль",reg_text:'Нажатием на кнопку "Создать аккаунт" вы соглашаетесь с',reg_privacy:"политикой конфиденциальности.",reg_logIn:"Войти",reg_logIn2:"Войти в аккаунт",reg_account:"Есть аккаунт?",log_reg:"Регистрация",log_title:"Вход в аккаунт",log_account:"Нет аккаунта?",log_forget:"Забыли пароль?",log_remember:"Запомнить меня",rec_title:"Восстановление пароля",rec_text:"Чтобы восстановить пароль, введите Email, на который вы регистрировали аккаунт. Если указанный Email в базе существует, на него придет письмо с инструкциями по восстановлению пароля.",set:"Сет",playlist:"Плейлист",playlists:"Плейлисты",tracks:"Треки",playingNow:"Играет сейчас",inQueue:"В очереди",logOut:"Выйти",browse:"Обзор",search:"Подбор музыки",mySets:"Мои сеты",profile:"Профиль",theBestMusicOnly:"Только лучшая музыка для вашего заведения",categories:"Категории",searchTitle:"Подбор музыки",letsSearch:"Давайте подберем музыку согласно вашему заведению и настроению",searchBtn:"Найти",searchByTitle:"Поиск по названию",featureListPlaceholder:"Категория",featureValuePlaceholder:"Значение",selectTypeFirst:"Выберите категорию",clearAllFilters:"Сбросить все фильтры",activeFilters:"Активные фильтры",playlistsFound:"Найдено плейлистов",noResult:"По вашему запросу ничего не найдено",noResultMood:"По вашему запросу ничего не найдено",resultSearch:"Здесь будет результат поиска",startSearch:"Начните искать",notFound:"К сожалению, по вашему запросу ничего не найдено(((",searchParam:"Попробуйте изменить параметры поиска",deselectLabel:"Удалить",selectedLabel:"Выбрано",selectLabel:"Выбрать",setsTitle:"Мои сеты",createdSets:"Созданные сеты",rename:"Переименовать",remove:"Удалить",includePlaylist:"Включенные плейлисты",ready:"Готово",edit:"Редактировать",confirmRemove:"Вы действительно хотите удалить? ",cancel:"Отменить",settings:"Настройки",prof_editData:"Редактировать данные ",prof_changePass:"Сменить пароль",prof_theme:"Темная тема",prof_subscribe:"Подписка",prof_month:"Ежемесячная",prof_price:"600 ₽",prof_end:"Истекает 04.06 2019",prof_control:"Управление",prof_passOld:"Текущий пароль",prof_passNew:"Новый пароль",trackCount:"Треков:",track:"Трек",playlist_duration:"Продолжительность",playlist_collapse:"Свернуть",playlist_more:"Подробнее",add_title:"Выберите сет",add_subtitle:"В какой сет добавить плейлист?",add_create:"Создать новый сет",new_title:"Новый сет",new_name:"Название сета",new_create:"Создать новый",404:"Такой страницы не существует"},n={forEstablishments:"For establishments"};i["a"].use(o["a"]);var l={ru:s,en:n},c=new o["a"]({locale:localStorage.getItem(r["c"].locale.local)||"ru",fallbackLocale:"en",messages:l});t["a"]=c}});
//# sourceMappingURL=app.bcefe25e.js.map