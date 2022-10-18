<template>
  <section class="left">
    <card-chunk style="height: 3.45rem;" title="测量头当天入库数量">
      <div class="aq_day">
        <div class="num">
          {{ 10 }}
        </div>
        <div class="text">
          <div class="day"><span>测量头</span></div>
          <div style="color: #b3b3b3">
            入库时间：<br />{{
            // status.dataSNStock.fdate
            // ? new Date(status.dataSNStock.fdate).format("yyyy年MM月dd日"):
            '未知'
            }}
          </div>
        </div>
      </div>
    </card-chunk>

    <card-chunk style="height: 4.1rem; margin-top: 0.75rem" title="PDS当天计划实时数据">
      <div class="pds">
        <ul class="pds-list">
          <li class="item green">
            <div class="circle">{{11 }}</div>
            <div class="title">计划数量</div>
          </li>
          <li class="item sky">
            <div class="circle">{{12 }}</div>
            <div class="title">当天开工产品数量</div>
          </li>
        </ul>
      </div>
    </card-chunk>

  </section>

  <section class="right">
    <card-chunk title="PDS当天入库量" style="height: 3.45rem;">
      <div class="total-order">
        <div class="order-left"><img class='img' src="@/2d/assets/img/home/订单.png" alt=""></div>
        <div class="order-right">
          <p>PDS</p>
          <div><span class="num">{{ 0 }}</span>单</div>
          <div class="order-footer">入库时间: {{' 未知'}}</div>
        </div>
      </div>

    </card-chunk>

    <card-chunk title="PDS当天过程数据" style="height: 4.1rem;margin-top: 0.75rem;">

    </card-chunk>

  </section>
</template>

<script setup lang="ts">
import CardChunk from '../chart/CardChunk.vue';</script>

<style lang="less" scoped>
@import '@/2d/css/home.less';
</style>
