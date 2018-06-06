import { After } from 'cucumber';

After(function() {
  this.clear();
});
