Vue.use(VueScrollTo, {
  duration: 1000
});
new Vue({
  el: '#app',
  data: {
    projects: [],
    name: "",
    subject: "",
    message: ""
  },
  created: function () {
    this.getProjects();
  },
  mounted: function () {
    this.getParticlesConfig();
    this.activateTyped();
  },
  methods: {
    getProjects: function () {
      axios.get('./js/experience.json')
        .then(response => {
          this.projects = response.data.projects;
          this.projects.forEach((project) => {
            project.skills = project.skills.join(' \267 ');
            project.image = `assets/${project.key}.png`;
          });
        });
    },
    getParticlesConfig: function () {
      axios.get('./js/particlesConfig.json')
        .then(response => {
          particlesJS('particles-js', response.data);
        });
    },
    activateTyped: function () {
      new Typed(".type", {
        strings: ['create.', 'design.', 'code.', 'solve.', 'dream.'],
        typeSpeed: 50,
        backSpeed: 50,
        backDelay: 1000,
        loop: true
      });
    },
    sendEmail: function () {
      var name = encodeURIComponent(this.name);
      var subject = encodeURIComponent(this.subject);
      var message = encodeURIComponent(this.message);
      window.location.href = `mailto:me@yolandaz.com?subject=${subject}&body=${message}%0A%0A${name}`;
    }
  }
});