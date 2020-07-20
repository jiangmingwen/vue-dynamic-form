<template>
  <div>
    <div
      class="form-upload-img"
      :class="[formItem ? formItem.size : '',data?'has-uploaded':'no-img',uploadError?'upload-error':'']"
      :style="{
        width: (formItem && formItem.imgWidth ? formItem.imgWidth : 120) + 'px',
        height: (formItem && formItem.imgHeight ? formItem.imgHeight : 120) + 'px',
    }"
    >
      <div v-if="uploading && mode !== 'detail'" class="modal-uploading">
        <a-icon type="loading" />
        <span>上传中...</span>
      </div>
      <template v-else>
        <template v-if="data">
          <div class="overlay-modal"></div>
          <div class="over-lay preview" :class="mode">
            <a-icon type="eye" @click="onPreview" title="预览" />
          </div>
          <div class="over-lay edit" v-if=" mode !== 'detail'">
            <a-icon type="edit" @click="onEdit" title="修改" />
          </div>
          <div class="over-lay delete" v-if=" mode !== 'detail'">
            <a-icon type="delete" @click="onDelete" title="删除" />
          </div>
        </template>
        <input
        v-if="mode !== 'detail'"
          class="file-dom"
          type="file"
          ref="fileDom"
          @change="onFileChange"
          @click="onFileClick"
          title
        />
        <img v-if="data" class="img-target" :src="imgUrl" />
        <div class="no-img-text" v-if="!data && mode !== 'detail'">
          <div class="upload-text" v-if="uploadError">上传失败</div>
          <a-icon type="plus" />
          <div
            class="upload-text"
            :class="[formItem &&formItem.uploadTextOverflow]"
            :title="formItem.uploadText"
            v-if=" formItem &&formItem.uploadText "
          >{{formItem.uploadText}}</div>
        </div>
      </template>
    </div>
    <div
      :style="{ width: (formItem && formItem.imgWidth ? formItem.imgWidth : 120) + 'px',}"
      class="img-remark"
      :title="formItem.remark"
      :class="[formItem &&formItem.remarkOverflow]"
      v-if="formItem && formItem.remark"
    >{{formItem.remark}}</div>
    <a-modal :visible="previewVisible" :footer="null" @cancel="previewVisible = false">
      <img alt="照片加载失败" style="width: 100%" :src="imgUrl" />
    </a-modal>
  </div>
</template>
<script>
import message from "ant-design-vue/es/message";
import axios from "axios";

export default {
  model: {
    prop: "value",
    event: "change"
  },
  props: ["formItem", "form", "config", "value",'mode'],
  data() {
    return {
      uploading: false,
      uploadError: false,
      data: "",
      previewVisible: false,
      previewImage: "",
      fileList: [],
      uploadUrl: "",
      renderKey: 0,
      headers: {
        timestamp: Date.now(),
        appid: "",
        token: ""
      },
      file: null,
      typeSet: {
        "image/png": "png",
        "image/jpeg": "jpg",
        "image/bmp": "bmp",
        "image/svg+xml": "svg",
        "image/gif": "gif"
      },
      fileTypes: []
    };
  },
  computed: {
    imgUrl() {
      if (this.data) {
        return `${window.SYS_CONFIG.OSS_Extranet_URL.Value}/${this.data}`;
      } else {
        return "";
      }
    }
  },

  methods: {
    onFileChange() {
      console.log(this.$refs.fileDom.files[0]);
      let file = this.$refs.fileDom.files[0];
      if (file) {
        console.log(this.formItem.fileTypes, "this.formItem.fileTypes");
        console.log(this.fileTypes, "fileTypes");
        console.log(this.typeSet[file.type], "this.typeSet[file.type])");
        if (!this.fileTypes.includes(this.typeSet[file.type])) {
          //类型判断
          message.error(
            `类型错误：请上传${this.fileTypes.join("、")}类型的照片`
          );
          return;
        }

        if (
          this.formItem &&
          this.formItem.fileLimit > 0 &&
          file.size / 1024 > this.formItem.fileLimit
        ) {
          //文件大小超出限制
          message.error(
            `文件大小超出：请上传${this.formItem.fileLimit}KB内的照片`
          );
          return;
        }
        this.uploadImg(file);
      }
    },
    uploadImg(file) {
      let formData = new FormData();
      formData.append("file", file);
      this.uploading = true;
      axios({
        method: "post",
        url: this.uploadUrl,
        headers: { "Content-Type": "multipart/form-data", ...this.headers },
        data: formData
      })
        .then(res => {
          if (res.data.IsSuccess && res.data.Data) {
            this.data = res.data.Data.FileId;
            this.$emit("change", this.data);
            this.uploadError = false;
          } else {
            this.uploadError = true;
            this.$emit("change", "");
          }
        })
        .catch(() => {
          this.uploadError = true;
          this.$emit("change", "");
        })
        .finally(() => {
          this.uploading = false;
        });
    },
    onFileClick() {
      console.log(this.file);
      this.uploadError = false;
    },
    onDelete() {
      this.data = "";
      this.$emit("change", "");
    },
    onEdit() {},
    onPreview() {
      this.previewVisible = true;
    }
  },
  mounted() {
    console.log(this.config, "config");
    if (this.config && this.formItem) {
      this.uploadUrl = this.config.gateway + this.formItem.api;
      this.fileTypes = this.formItem.fileTypes || [];
      let userModel = this.config.userModel;
      if (userModel) {
        this.headers = {
          timestamp: Date.now(),
          appid: userModel.AppCode,
          token: userModel.access_token
        };
      }
    }
  }
};
</script>
<style lang="less" scoped>

.img-remark {
  line-height: 20px;
  font-size: 12px;
  &.wrap {
    word-break: break-all;
    white-space: normal;
  }
  &.ellipsis {
    width: 100%;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
}
.form-upload-img {
  line-height: 20px;
  padding: 5px;
  border: 1px dashed @border-color-base;
  position: relative;
  background-color: #ffffff;
  border-radius: @border-radius-base;
  &.upload-error {
    border-color: @error-color;
    .no-img-text {
      color: @error-color;
    }
  }
  &.no-img {
    cursor: pointer;
    .file-dom {
      cursor: pointer;
    }
  }
  &.has-uploaded {
    border-style: solid;
    &:hover {
      .overlay-modal {
        display: block;
      }
      .over-lay {
        display: flex;
      }
    }
  }
  .file-dom {
    width: calc(100% - 12px);
    height: calc(100% - 12px);
    position: absolute;
    left: 6px;
    top: 6px;
    z-index: 10;
    opacity: 0;
    &:focus {
      outline: none !important;
    }
  }
  .no-img-text {
    width: calc(100% - 12px);
    height: calc(100% - 12px);
    position: absolute;
    left: 6px;
    top: 6px;
    z-index: 8;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    i {
      font-size: 30px;
    }
    .upload-text {
      &.wrap {
        word-break: break-all;
        white-space: normal;
      }
      &.ellipsis {
        width: 100%;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
    }
  }
  .img-target {
    width: 100%;
    height: 100%;
  }
  .modal-uploading {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    z-index: 12;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #ffffff;
    i {
      font-size: 30px;
      margin-bottom: 5px;
    }
  }
  .overlay-modal {
    position: absolute;
    left: 6px;
    top: 6px;
    background-color: rgba(0, 0, 0, 0.5);
    width: calc(100% - 12px);
    height: calc(100% - 12px);
    z-index: 9;
    display: none;
    transition: all 0.3s;
  }
  .over-lay {
    position: absolute;
    z-index: 11;
    height: 100%;

    align-items: center;
    cursor: pointer;
    color: #ffffff;
    display: none;
    &.preview {
      left: 30px;
      &:hover {
        color: @primary-color;
      }
      &.detail{
        left: 45%;
      }
    }
    &.edit {
      z-index: 9;
      left: 45%;
      &:hover {
        color: @warning-color;
      }
    }
    &.delete {
      right: 30px;
      &:hover {
        color: @error-color;
      }
    }
  }
}
</style>
