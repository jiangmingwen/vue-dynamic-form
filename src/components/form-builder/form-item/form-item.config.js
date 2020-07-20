import input from './input/config';
import textarea from './textarea/config';
import grid from './grid/config';
import number from './number/config';
import divider from './divider/config'
import text from './text/config';
import datetime from './date-time/config';
import month from './month/config';
import week from './week/config'
import dateRange from './date-range/config';
import time from './time/config';
import tag from './tag/config';
import pcd from './pcd/config';
import switchConfig from './switch/config'; //switch关键字
import rate from './rate/config';
import radio from './radio/config';
import checkbox from './checkbox/config';
import select from './select/config';
import multiSelect from './multi-select/config';
import tagSelect from './tag-select/config';
import uploadImg from './upload-img/config';

export const BASIC = {
    title: "基础控件",
    children: [
        input,
        textarea,
        number,
        datetime,
        month,
        week,
        dateRange,
        time,
        tag,
        tagSelect,
        switchConfig,
        rate,
        radio,
        checkbox,
        select,
        multiSelect,
    ]
}


export const LAYOUT = {
    title: '布局控件',
    children: [
        grid,
        divider,
        text
    ]
}

export const PRO = {
    title: '高级控件',
    children: [
        pcd,
        uploadImg
    ]
}

export default [
    BASIC,
    LAYOUT,
    PRO
]