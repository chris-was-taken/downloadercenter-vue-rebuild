<template>

    <tr class="resultRow" @click="openSite(searchPositionObject.links[0].location)">
      <td>837168</td>
      <td>{{ searchPositionObject.title }}<br><span class="fileName">[{{ searchPositionObject.fileName }}]</span></td>
      <td><img :src="getLanguageIcon()"></td>
      <td>{{ searchPositionObject.fileType }}</td>
      <td>{{ (searchPositionObject.fileSize / 1000 / 1000).toFixed(3) }} MB</td>
    </tr>

</template>

<script>

  var images = require.context('../assets/icons/languages/', false, /\.png$/)

  export default {
    name: 'SearchPosition',
    props: {
      searchPositionObject: {
        type: Object,
        required: true
      },
    },
    methods: {
      getLanguageIcon() {
        switch (this.searchPositionObject.language) {
          case "en" :
            return images("./gb.png");
            break;
          case "de" :
            return images("./de.png");
            break;
          case "cs" :
            return images("./cz.png");
            break;
          case "es" :
            return images("./es.png");
            break;
          case "fr" :
            return images("./fr.png");
            break;
          case "hu" :
            return images("./hu.png");
            break;
          case "it" :
            return images("./it.png");
            break;
          case "nl" :
            return images("./nl.png");
            break;
          case "pl" :
            return images("./pl.png");
            break;
          case "ru" :
            return images("./ru.png");
            break;
          case "sk" :
            return images("./sk.png");
            break;
          case "sv" :
            return images("./sv.png");
            break;
          default:
            break;
        }
      },
      openSite(link) {
        window.open(link,"_blank")
      }
    }
  };
</script>

<style scoped>

  a {
    width: 100%;
    height: 100%;
  }

  .resultRow {
    height: 30px;
    cursor: pointer;
  }

  .fileName {
    font-size: 12px;
    color: lightgrey;
  }

  td {
    padding: 6px;
    font-size: 14px;
  }

</style>
