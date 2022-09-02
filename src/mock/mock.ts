import Mock from 'mockjs'
import banner from './banner.json'
import floor from './floor.json'

Mock.mock('/mock/banner',{
    code: 200,
    data: banner
})

// 提供所有楼层数据的接口
Mock.mock('/mock/floor',{
    code: 200,
    data: floor
})
