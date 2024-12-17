<template>
  <div class="register">
    <el-form
      ref="registerRef"
      :model="registerForm"
      :rules="registerRules"
      class="register-form"
    >
      <h3 class="title">用户注册</h3>

      <!-- 用户名输入 -->
      <el-form-item prop="username">
        <el-input
          v-model="registerForm.username"
          type="text"
          size="large"
          auto-complete="off"
          placeholder="请输入用户名"
        />
      </el-form-item>

      <!-- 邮箱输入 -->
      <el-form-item prop="email">
        <el-input
          v-model="registerForm.email"
          type="email"
          size="large"
          auto-complete="off"
          placeholder="请输入邮箱"
        />
      </el-form-item>

      <!-- 密码输入 -->
      <el-form-item prop="password">
        <el-input
          v-model="registerForm.password"
          type="password"
          size="large"
          auto-complete="off"
          placeholder="请输入密码"
        />
      </el-form-item>

      <!-- 确认密码输入 -->
      <el-form-item prop="confirmPassword">
        <el-input
          v-model="registerForm.confirmPassword"
          type="password"
          size="large"
          auto-complete="off"
          placeholder="确认密码"
        />
      </el-form-item>

      <!-- 注册按钮 -->
      <el-form-item style="width: 100%;">
        <el-button
          size="large"
          type="primary"
          style="width: 100%;"
          @click="handleRegister"
        >
          注 册
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { ElMessage } from 'element-plus';
import request from '@/util/request';
import qs from 'qs';

export default {
  data() {
    return {
      registerForm: {
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
      },
      registerRules: {
        username: [{ required: true, trigger: 'blur', message: '请输入用户名' }],
        email: [
          { required: true, trigger: 'blur', message: '请输入邮箱' },
          { type: 'email', trigger: 'blur', message: '邮箱格式不正确' }
        ],
        password: [
          { required: true, trigger: 'blur', message: '请输入密码' },
          { min: 6, trigger: 'blur', message: '密码长度至少为6位' }
        ],
        confirmPassword: [
          { required: true, trigger: 'blur', message: '请确认密码' },
          {
            validator: (rule, value) => value === this.registerForm.password,
            trigger: 'blur',
            message: '两次密码输入不一致'
          }
        ]
      }
    };
  },
  methods: {
    async handleRegister() {
      this.$refs.registerRef.validate(async (valid) => {
        if (valid) {
          try {
            let result = await request.post('user/register', this.registerForm);
            let data = result.data;
            if (data.code === 200) {
              ElMessage({
                message: '注册成功！',
                type: 'success'
              });
              // 注册成功后跳转登录页面
              this.$router.push('/login');
            } else {
              ElMessage({
                message: data.message || '注册失败，请稍后再试',
                type: 'error'
              });
            }
          } catch (error) {
            ElMessage({
              message: '网络异常，请稍后再试',
              type: 'error'
            });
          }
        } else {
          ElMessage({
            message: '请完善注册信息',
            type: 'warning'
          });
        }
      });
    }
  }
};
</script>

<style scoped lang="scss">
.register {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: url('../assets/images/register-bg.png') no-repeat center center;
  background-size: cover;
}

.register-form {
  background-color: rgba(255, 255, 255, 0.9);
  padding: 40px;
  width: 400px;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.title {
  text-align: center;
  margin-bottom: 20px;
  font-size: 24px;
  color: #333;
}

.el-form-item {
  margin-bottom: 20px;
}

.el-button {
  width: 100%;
  background-color: #409eff;
  color: white;
  border-radius: 5px;
  font-size: 16px;
}

.el-register-footer {
  text-align: center;
  font-size: 14px;
  color: #999;
  margin-top: 30px;
}

.el-register-footer a {
  color: #409eff;
  text-decoration: none;
}

.el-register-footer a:hover {
  text-decoration: underline;
}
</style>
