<template>
  <div class="register-container">
    <!-- 注册内容 -->
    <div class="register">
      <h3>注册新用户
        <span class="go">我有账号，去 <router-link to="/login">登陆</router-link>
        </span>
      </h3>
      <div class="form__">
        <el-form
            ref="ruleFormRef"
            :model="ruleForm"
            :rules="rules"
            label-width="80px"
            class="demo-ruleForm"
            label-position="left"
            :hide-required-asterisk="true"
        >
          <el-form-item label="电话号码" prop="phone">
            <el-input v-model="ruleForm.phone" type="text" autocomplete="off" />
          </el-form-item>
          <el-form-item label="验证码" prop="code">
            <el-input v-model="ruleForm.code" type="text" autocomplete="off"/>
            <el-button @click="getCode" class="getcode" size="small">获取验证码</el-button>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="ruleForm.password" type="password" autocomplete="off"/>
          </el-form-item>
          <el-form-item label="确认密码" prop="re_password" style="margin-bottom: 10px">
            <el-input v-model="ruleForm.re_password" type="password" autocomplete="off"/>
          </el-form-item>
          <el-form-item>
            <el-checkbox v-model="ruleForm.checked" label="同意协议并注册《尚品汇用户协议》" />
          </el-form-item>
          <el-form-item >
            <el-button type="primary" @click="submitForm(ruleFormRef)" class="subBtn">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>

    <!-- 底部 -->
    <div class="copyright">
      <ul>
        <li>关于我们</li>
        <li>联系我们</li>
        <li>联系客服</li>
        <li>商家入驻</li>
        <li>营销中心</li>
        <li>手机尚品汇</li>
        <li>销售联盟</li>
        <li>尚品汇社区</li>
      </ul>
      <div class="address">地址：北京市昌平区宏福科技园综合楼6层</div>
      <div class="beian">京ICP备19006430号
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, reactive, ref} from 'vue';
import {useStore} from "vuex";
import {useRouter} from "vue-router";
import type { FormInstance } from 'element-plus'
import { ElMessage } from 'element-plus'
import 'element-plus/theme-chalk/el-message.css'
export default defineComponent({
  name: 'Register',
  setup(){
    const ruleFormRef = ref<FormInstance>()
    const store = useStore()
    const router = useRouter()
    const getCode = async () => {
      if (!ruleForm.phone){
        ElMessage({
          message: '请输入电话号码',
          type: 'warning',
        })
      }
      else {
        try {
          await store.dispatch('user/getCode',ruleForm.phone)
          ruleForm.code = store.state.user.code
        }catch (e) {
          console.log(e.message)
        }
      }
    }
    const register = async () => {
      try {
        let data = {
          phone:ruleForm.phone,
          password:ruleForm.password,
          code:ruleForm.code
        }
        if(!ruleForm.code){
          ElMessage({
            message: '请点击按钮获取验证码',
            type: 'warning',
          })
        }
        else if(ruleForm.checked==false){
          ElMessage({
            message: '请阅读协议并确认',
            type: 'warning',
          })
        }
        else {
          await store.dispatch('user/register',data)
          router.push('/login')
        }
      }catch (e) {
        console.log(e.message)
      }
    }

    const validatePhone = (rule: any, value: any, callback: any) => {
      const reg = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
      if (value === '') {
        callback(new Error('请输入用户名（电话号码）'))
      } else {
        setTimeout(() => {
          if (!reg.test(value)) {
            callback(new Error('请输入正确的电话号码'))
          } else {
            callback()
          }
        }, 100)
      }
    }
    const validatePass = (rule: any, value: any, callback: any) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      }  else {
        if (ruleForm.re_password !== '') {
          if (!ruleFormRef.value) return
          ruleFormRef.value.validateField('re_password', () => null)
        }
        callback()
      }
    }
    const validatePass2 = (rule: any, value: any, callback: any) => {
      if (value === '') {
        callback(new Error('请输入确认密码'))
      } else if (value !== ruleForm.password) {
        callback(new Error("两次密码输入不一致"))
      } else {
        callback()
      }
    }
    const ruleForm = reactive({
      phone : '',
      password: '',
      code:'',
      re_password:'',
      checked:false
    })
    const rules = reactive({
      phone: [{ validator: validatePhone, trigger: 'blur',required:true }],
      password: [{ validator: validatePass, trigger: 'blur',required:true }],
      re_password: [{ validator: validatePass2, trigger: 'blur',required:true }]
    })
    const submitForm = (formEl: FormInstance | undefined) => {
      if (!formEl) return
      formEl.validate((valid) => {
        if (valid) {
          register()
        } else {
          return false
        }
      })
    }
    return{
      ruleFormRef,
      ruleForm,
      rules,
      submitForm,
      getCode
    }
  }
})
</script>>

<style lang="less" scoped>
  .register-container {
    .register {
      width: 1200px;
      height: 445px;
      border: 1px solid rgb(223, 223, 223);
      margin: 0 auto;

      h3 {
        background: #ececec;
        margin: 0;
        padding: 6px 15px;
        color: #333;
        border-bottom: 1px solid #dfdfdf;
        font-size: 20.04px;
        line-height: 30.06px;

        span {
          font-size: 14px;
          float: right;

          a {
            color: #e1251b;
          }
        }
      }
      .form__{
        width: 350px;
        margin: 20px auto;
        .getcode{
          margin-top: 10px;
        }
      }

      .subBtn {
        outline: none;
        width: 270px;
        height: 36px;
        background: #e1251b;
        color: #fff !important;
        display: inline-block;
        font-size: 16px;
      }
    }

    .copyright {
      width: 1200px;
      margin: 0 auto;
      text-align: center;
      line-height: 24px;

      ul {
        li {
          display: inline-block;
          border-right: 1px solid #e4e4e4;
          padding: 0 20px;
          margin: 15px 0;
        }
      }
    }
  }
</style>
