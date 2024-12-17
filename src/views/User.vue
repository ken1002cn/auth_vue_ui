<template>
  <div class="user-detail">
    <h2 class="title">用户详情</h2>
    
    <div class="user-info">
      <div class="info-item">
        <label>用户名:</label>
        <span>{{ user.username }}</span>
      </div>
      <div class="info-item">
        <label>邮箱:</label>
        <span>{{ user.email }}</span>
      </div>
      <div class="info-item">
        <label>电话:</label>
        <span>{{ user.phone_number }}</span>
      </div>
      <div class="info-item">
        <label>注册时间:</label>
        <span>{{ user.create_time }}</span>
      </div>
    </div>
    
    <!-- 编辑按钮 -->
    <button @click="dialogFormVisible = true" class="edit-btn">编辑</button>
    <!-- 弹框 -->
    <el-dialog v-model="dialogFormVisible" title="用户详情-编辑" style="width: 500px;">
      <div style="margin-bottom: 20px;">
        <el-form-item label="邮箱地址" style="width: 300px;">
          <el-input v-model="userFrom.email" placeholder="请输入邮箱" />
        </el-form-item>
      </div>
      <div style="margin-bottom: 20px;">
        <el-form-item label="手机号码" style="width: 300px;">
          <el-input v-model="userFrom.phone_number" placeholder="请输入手机号" />
        </el-form-item>
      </div>
      <!-- 弹框下面的按钮-->
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="sumitUser">
            确认
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import request from '@/util/request';
import { ElMessage } from 'element-plus'
export default {
  name: "UserDetail",
  data() {
    return {
      user: {
        username: "",
        email: "",
        phone_number: "",
        create_time: ""
      },
      userFrom: {
        id:0,
        username: "",
        email: "",
        phone_number: ""
      },
      dialogFormVisible: false,
    };
  },
  created() {
    this.getUserInfo();
  },
  methods: {
    // 编辑用户信息
    async sumitUser() {
      this.dialogFormVisible = false    
      this.userFrom.id = window.sessionStorage.getItem("uid");
      let result = await request.post("user/info",this.userFrom)
      if(result.data.code == 200){
        ElMessage({
          message: '信息修改成功!',
          type: 'success',
        })
        this.getUserInfo()
      }
    },
    async getUserInfo() {
      let uid = window.sessionStorage.getItem("uid");
      let result = await request.get(`user/info?uid=${uid}`);
      this.user = result.data.data;
    }
  }
};
</script>

<style scoped>
.user-detail {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.title {
  text-align: center;
  font-size: 24px;
  margin-bottom: 20px;
}

.user-info {
  margin-bottom: 20px;
}

.info-item {
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
}

.info-item label {
  font-weight: bold;
}

.info-item span {
  font-size: 16px;
}

.edit-btn {
  display: block;
  width: 100%;
  padding: 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.edit-btn:hover {
  background-color: #45a049;
}
</style>
