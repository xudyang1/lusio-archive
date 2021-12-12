

export default class AchievementManager{
    static currentprofile;
    static setProfile(profile){
        this.currentprofile = profile;
    }
    static evaluateAchievement(achievement){
        let conditions = achievement.conditions
        let operator = conditions.operation

        switch(operator){
            case "ge":
                return this.getValue(conditions.stats) >= conditions.value;
            case "gt":
                return this.getValue(conditions.stats) > conditions.value;
            case "eq":
                return this.getValue(conditions.stats) == conditions.value;
        }
        return false
    }

    static getValue(stats){
        switch(stats){
            case "level" : return this.currentprofile.level;
            case "quizzesCreated" : return this.currentprofile.quizzesCreated.length
            case "quizzesTaken" : return this.currentprofile.quizzesTaken.length
        }
    }
}