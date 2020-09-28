<template>
  <div class="create">
    <UserForm
      :fields="formfields"
      :createUser='handleCreateUser'
      @create="handleCreateUser"
      @add-repeater="handleAddRepeater"
      @del-repeater="handleDelRepeater"
    />
  </div>
</template>

<script>
import CreateMixin from "@/mixins/UserCreateUpdate";
export default {
  name: "Create",
  mixins: [CreateMixin],
};
</script>