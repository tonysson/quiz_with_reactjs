import React, { Fragment} from 'react'

const ProgressBar = ({idQuestion , maxQuestion}) => {

    // calcul le poucentage d'avancement
    const getWidth = (totalQuestions , questionId) => {
        return( questionId / totalQuestions) * 100
    }

    const actualQuestion = idQuestion + 1;
    const progressPercent =  getWidth(maxQuestion , actualQuestion)


    return (

        <Fragment>
            <div className="percentage">
                <div className="progressPercent">
                    {
                        `Question: ${actualQuestion}/${maxQuestion}`
                    }
                </div>
                <div className="progressPercent">
                    {` Progression : ${progressPercent}%`}
               </div>
            </div>
            <div className="progressBar">
                <div className="progressBarChange" style={{width: `${progressPercent}%`}}></div>
            </div>
        </Fragment>
       
    )
}

export default React.memo(ProgressBar)
