<template>
  <div class="update">
    <UserForm
      update
      :fields="formfields"
      :updateUser='handleUpdateUser'
      @update="handleUpdateUser"
      @add-repeater="handleAddRepeater"
      @del-repeater="handleDelRepeater"
    />
  </div>
</template>

<script>
import UpdateMixin from "@/mixins/UserCreateUpdate";
export default {
  name: "Update",
  mixins: [UpdateMixin],
};
</script>