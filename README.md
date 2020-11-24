# home

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


````
<template v-slot:header.name="{ header }">
  {{ header.text.toUpperCase() }} (customized)
</template>

<template v-if="templateIsShow" v-slot:body="{items}">
  <tbody>
  <tr v-for="item in items" :key="item.length">
    <td>{{ item.call }}</td>
    <td>{{ item.sex }}</td>
    <td>{{ item.name }}</td>
    <td>{{ item.bak_1 }}</td>
    <td>{{ item.born }}</td>
    <td>{{ item.area }}</td>
    <td :class="{typeClass:isTypeClass}">
      <v-btn v-for="(item, index) in item.type" :key="index" :color="item.color">
        {{ item.text }}
      </v-btn>
    </td>
    <td :class="{typeClass:isTypeClass}">{{ item.desc }}</td>
    <td>{{ item.created_at }}</td>
    <td>{{ item.control }}</td>
  </tr>
  </tbody>
</template>
````
    //去掉第一个是空白
    kKVJYRsNLOBp95GV
    // this.daYunArr.splice(0, 1)
    //倒序排列
    // this.daYunArr.reverse()
    // this.startAge.reverse()
    // this.startYear.reverse()
````

<template v-slot:top="{ pagination, options, updateOptions }">
  <v-data-footer
      :pagination="pagination"
      :options="options"
      @update:options="updateOptions"
      items-per-page-text="$vuetify.dataTable.itemsPerPageText"/>
</template>
````

git reset --hard HEAD

git pull -r 或 git pull