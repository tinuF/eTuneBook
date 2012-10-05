'use strict';

/**
 * Format eTuneBook-Skill: Add Description.
 */
eTuneBook.filter('addSkillDescription', function() {
    return function(skill) {
		//todo:integrate with skilltypes
		if (skill == 1) {
			skill = "*";
		} else if (skill == 2) {
			skill = "* *";	
		} else if (skill == 3) {
			skill = "* * *";
		} else if (skill == 4) {
			skill = "* * * *";
		} else if (skill == 5) {
			skill = "* * * * *";
		} else if (skill == 6) {
			skill = "* * * * * *";
		}
	
		return skill;
    };
  });
