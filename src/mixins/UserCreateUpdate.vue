<script>
import api from "@/api/api";
import UserForm from "@/components/UserForm";
export default {
  name: "UserCreateUpdate",
  components: {
    UserForm,
  },
  data: () => ({
    formfields: [],
  }),
  created() {
    this.getForm(this.$route.params.id);
  },
  methods: {
    handleDelRepeater([filed, valueIndex]) {
      this.formfields[filed].value.splice(valueIndex, 1);
    },
    handleAddRepeater(index) {
      console.log("handleAddRepeater");
      let keys = Object.keys(this.formfields[index].repeater_fields);
      this.formfields[index].value.push(
        keys.reduce((a, b) => ({ ...a, [b]: "" }), {})
      );
    },
    async getForm(id) {
      let { error, form, message } = await api.getForm(id);
      if (error) {
        return console.log("ERROR:", message);
      }

      console.log(form);

      this.formfields = Object.entries(form).map(([key, value]) => ({
        key,
        ...value,
      }));

      this.formfields.forEach((field, index) => {
        if (field.type === "repeater" && field.value.length === 0) {
          this.handleAddRepeater(index);
        } else if (["radio", "select"].includes(field.type)) {
          field.value = field.default;
        }
      });
    },
    async handleCreateUser(user) {
      console.log("handleCreateUser", user);
      let res = await api.createUser(user);
      console.log(res);
    },
    async handleUpdateUser(user) {
      console.log("handleUpdateUser", user);
      let res = await api.createUser(user);
      console.log(res);
    },
  },
};
</script>
