<template>
  <v-card
      class="my-6 mx-6"
  >
    <!--      排盘规则-->
    <v-expansion-panels>
      <v-expansion-panel>
        <v-expansion-panel-header>
          排盘规则
          <template v-slot:actions>
            <v-icon color="error">
              $expand
            </v-icon>
          </template>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-card
              class="float-left"
              flat
          >
            <v-card-text class="pa-0">
              <v-timeline align-top dense>
                <v-timeline-item color="blue" small>
                  <div class="body-1">所选日期为公历</div>
                </v-timeline-item>
                <v-timeline-item color="pink" small>
                  <div class="body-1">立春换年 交节换月 子正换日 正点换时</div>
                  <v-card flat>
                    <v-card-text class="body-2">
                      例如：立春时刻为14:30:02，则可能导致一天，中上午属于上一年，下午属于下一年，其他以此类推。<br>
                      尤其跨节点的时间，如需校对真太阳时，请自行查询。
                    </v-card-text>
                  </v-card>
                </v-timeline-item>
                <v-timeline-item color="#E040FB" small>
                  <div class="body-1">分早晚子时，23:00到23:59为晚子时。</div>
                </v-timeline-item>
                <v-timeline-item color="orange" small>
                  <div class="body-1">具体如何确定命盘，请结合实际情况灵活调整。</div>
                </v-timeline-item>
              </v-timeline>
            </v-card-text>
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-card>
</template>

<script>
export default {
  name: "MingPanRules"
}
</script>