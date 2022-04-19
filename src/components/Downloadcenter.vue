<template>
  <div>

    <select class="languageSetter" @change="setLang()" v-model="selectLanguage">
      <option value="de">DE</option>
      <option value="en">EN</option>
      <option value="nl">NL</option>
      <option value="fr">FR</option>
      <option value="se">SE</option>
      <option value="svk">SVK</option>
      <option value="svn">SVN</option>
      <option value="cs">CS</option>
      <option value="es">ES</option>
      <option value="it">IT</option>
      <option value="pl">PL</option>
      <option value="ru">RU</option>
    </select>

    <img class="logo" @click="response = []; wrongQuery = false; input.searchQuery=''" src="../assets/conrad_logo_regular.svg">

    <div class="searchContainer">

      <select  class="languageFilter" v-model="input.languageFilter">
        <option value="">{{ $t("language") }}</option>
        <option value="de">German</option>
        <option value="en">English</option>
        <option value="cs">Czech</option>
        <option value="es">Spanish</option>
        <option value="fr">French</option>
        <option value="hu">Hungarian</option>
        <option value="it">Italian</option>
        <option value="nl">Dutch</option>
        <option value="pl">Polish</option>
        <option value="ru">Russian</option>
        <option value="sk">Slovak</option>
        <option value="sv">Slovenien</option>
      </select>

      <input type="text" class="searchBar" v-model="input.searchQuery" @keyup.enter="sendData()" :placeholder='$t("searchPlaceholder")' />
      <button class="searchBarButton" v-on:click="sendData()">{{ $t("search") }}</button>

    </div>

    <div v-if="wrongQuery">
      {{ $t("wrongQuery") }}
    </div>

    <div v-if="response.length == 0 && !wrongQuery">
      <img class="icon" src="../assets/icons/an.svg">
      <img class="icon" src="../assets/icons/ce.svg">
      <img class="icon" src="../assets/icons/da.svg">
      <img class="icon" src="../assets/icons/el.svg">
      <img class="icon" src="../assets/icons/in.svg">
      <img class="icon" src="../assets/icons/si.svg">
      <img class="icon" src="../assets/icons/sp.svg">
      <img class="icon" src="../assets/icons/up.svg">
      <div class="infoText">
        <span>{{ $t("infoText1") }}</span><br><br>
        <span>{{ $t("infoText2") }}</span>
        <span>
          <br><br>{{ $t("infoText3") }}<br><br>
          {{ $t("document1") }} <br>
          {{ $t("document2") }} <br>
          {{ $t("document3") }} <br>
          {{ $t("document4") }} <br>
          {{ $t("document5") }} <br>
          {{ $t("document6") }} <br>
          {{ $t("document7") }} <br>
          {{ $t("document8") }} <br>

        </span>
      </div>
    </div>

    <div class="resultBox" v-if="response.length != 0">
      <table id="resultTable" class="resultTable">
        <tr>
          <th class="firstRow">Artnr</th>
          <th>{{ $t("resultDescription") }}</th>
          <th>{{ $t("resultLanguage") }}</th>
          <th>{{ $t("resultTyp") }}</th>
          <th>{{ $t("resultSize") }}</th>
        </tr>
        <tbody v-for="position in response" >
          <SearchPosition
            :searchPositionObject="position"/>
        </tbody>
      </table>
    </div>

    <div class="footer">
      <a href="https://www.conrad.de" target="_blank">{{ $t("footerWebshop") }}</a>
    </div>

  </div>
</template>

<script>
  import axios from "axios";
  import SearchPosition from "./SearchPosition.vue";

  export default {
    name: 'Downloadcenter',
    components: {
      SearchPosition
    },
    data () {

      return {

        input: {
          searchQuery: "",
          languageFilter: "",
        },

        response: [],
        wrongQuery: false,
        selectLanguage: "de"

      }

    },
    methods: {
      sendData() {

        if(this.input.searchQuery == "") {
          this.response = [];
          this.wrongQuery = true;
          return;
        }

        let authorizationToken = "Bearer "+this.$getAccessToken().access_token;

        let apiHost = "https://api-rs.mycliplister.com";
        let api = "/v2.2/apis/asset/list"
        let apiParas = "?limit=30&order_by=title&order_method=desc&include_meta=true"
        let search = '&search={"title":"*'+this.input.searchQuery+'*","object_type":"document"';

        let languageFilter = "}&search_hits=2";
        if (this.input.languageFilter != "") {
          languageFilter = ',"language": "'+this.input.languageFilter+'"}&search_hits=3';
        }

        let apiQuery = apiHost + api + apiParas + search + languageFilter;

        axios({ method: "GET", "url": encodeURI(apiQuery),"data": {}, "headers": { "Authorization": authorizationToken } }).then(result => {

          this.response = [];

          result.data.forEach((va) => {
            this.response.push(va)
          })

          console.log(this.response)
          this.wrongQuery = false;

        }, error => {

          this.response = [];
          this.wrongQuery = true;

        });
      },
      setLang: function () {

        let lang = this.selectLanguage
        localStorage.setItem("i18n",lang)
        this.$i18n.locale = lang

      },
    },
    mounted() {
      this.selectLanguage = localStorage.getItem("i18n")
    },
  }
</script>

<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}



.icon {
  width: 5%;
  height: 5%;
}

.resultTable {
  border-collapse: collapse;
  width: 100%;

}

.footer {
  width: 100%;
  background-color: #0098dd;
  height: 30px;
  position: absolute;
  bottom: 0;
  color: white;
  text-align: center;
  padding-top: 10px;
  font-weight: bold;
}

.footer a {
  text-decoration: none;
  color: white;
}

.firstRow {
  width: 430px;
}

.infoText {
  width: 30%;
  margin: auto;
  margin-top: 3%;
  font-size: 18px;
  color: darkgray;
}

tbody:nth-child(even) {
  background-color: #f4f4f4;
}

.languageSetter {
  position: absolute;
  left: 0;
  top: 0;
  border: none;
  outline: none;
  width: 6%;
  height: 3%;
}

  .searchContainer {
    height: 40px;
    margin-bottom: 2.5%;
  }

  .resultBox {
    overflow-y: scroll;
    height: 592px;
  }

  /*Just filter out this part here if you dont want sticky table headers*/
  .resultBox th {
    position: sticky;
    top: 0;
    background: white;
    padding-bottom: 10px;
  }

  .searchBar {
    height: 100%;
    width: 30%;
    padding: 6px 10px 6px 27px;
    color: #616161;
    background: transparent;
    font-size: 13px;
    line-height: 17px;
    border: 3px solid #0098dd;
    position: relative;
    margin-right: -.3%;
    outline: none;
  }

  .searchBarButton {
    background: #0098dd;
    color: white;
    height: 145%;
    width: 8%;
    border: none;
    outline: none;
  }


  .languageFilter {
    outline: none;
    height: 145%;
    width: 8%;
    padding: 6px 10px 6px 27px;
    color: white;
    background: #0098dd;
    font-size: 13px;
    line-height: 17px;
    border: 3px solid #0098dd;
    position: relative;
    margin-right: -.3%;
  }

  .logo {
    width: 35%;
    height: 20%;
    cursor: pointer;
    margin-top: .9%;
    margin-bottom: 1.5%;
  }
</style>
