import React , {useEffect, useState} from 'react';
import Stepper from 'react-stepper-horizontal'

const Levels = ({levelNames , quizLevel}) => {


    const [levels , setLevels] = useState([]);

    useEffect(() => {
        const quizSteps = levelNames.map(level => ({ title : level.toUpperCase()}))
        setLevels(quizSteps)
    }, [levelNames])
    return (
       <div 
       style = 
       {{
           background:'transparent'
       }}
       className="levelsContainer">
                <Stepper 
                circleFontSize={20}
                size={45}
                barStyle={'dashed'}
                completeTitleColor={'#E0E0E0'}
                defaultTitleColor={'#E0E0E0'}
                completeColor={'#E0E0E0'}
                completeBarColor={'#E0E0E0'}
                activeColor={'rgba(173, 20, 87,1.0)'}
                activeTitleColor={'rgba(173, 20, 87,1.0)'}
                circleTop = {0}
                steps={levels } 
                activeStep={quizLevel}/>
       </div>
    )
}

export default React.memo(Levels)
