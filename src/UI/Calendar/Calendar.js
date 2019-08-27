import React from "react"
import { connect } from "react-redux"

import Aux from "../../hoc/Auxiliary/Auxiliary"
import {
  selectYear,
  selectMonth,
  selectDate,
  previousMonth,
  nextMonth
} from "../../store/actions/commonActions"
import Button from "../Button/Button"
import * as _ from "../../Utils/_"
import "./Calendar.css"

const calendar = props => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ]

  let firstDay = new Date(props.year, props.month).getDay()

  const daysInMonth = () => {
    return 32 - new Date(props.year, props.month, 32).getDate()
  }

  const createCalendar = () => {
    let date = 1

    return [0, 1, 2, 3, 4, 5].map(row => {
      // 6 rows
      return (
        <tr key={row}>
          {[0, 1, 2, 3, 4, 5, 6].map(col => {
            // Sunday to Saturday
            if (row === 0 && col < firstDay) {
              return <td key={col}>&nbsp;</td>
            } else if (date > daysInMonth()) {
              return <td key={col} />
            } else {
              // changes color for selected date
              let classNames = ["days"]
              if (props.date === date) {
                classNames.push("active")
              }

              // fix color for today
              if (date === _.getDayFromDate(_.getCurrentDate())) {
                classNames.push("today")
              }

              return (
                <td
                  key={col}
                  className={classNames.join(" ")}
                  // className={`backgroundColor: ${props.date === date ? "active" : ""}`}
                  data-value={date}
                  onClick={selectedDateHandler}
                >
                  {date++}
                </td>
              )
            }
          })}
        </tr>
      )
    })
  }

  /**
   * Gets years range of ten
   * For example, if selected year is 2020, returns 2015~2025
   */
  const getYearsRangeOfTen = () => {
    let start = parseInt(props.year) - 5
    let end = parseInt(props.year) + 5

    let yearArr = []
    for (let i = start; i <= end; i++) {
      yearArr.push(i)
    }

    return yearArr
  }

  const getDaysTitle = () => {
    return (
      <tr>
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(title => (
          <td key={title}>{title}</td>
        ))}
      </tr>
    )
  }

  const selectedYearHandler = e => {
    props.selectYear(e.target.value)
  }

  const selectedMonthHandler = e => {
    const month_idx = months.indexOf(e.target.value)
    props.selectMonth(month_idx)
  }

  const selectedDateHandler = e => {
    props.selectDate(e.target.dataset.value)
  }

  return (
    <Aux styleName="Calendar">
      <table>
        <thead>
          <tr>
            <th colSpan="7">
              {months[props.month]} {props.year}
            </th>
          </tr>
        </thead>

        <tbody>
          {getDaysTitle()}
          {createCalendar()}
        </tbody>
      </table>

      <div className="btn">
        <Button clicked={props.previousMonth}>Previous</Button>
        <Button clicked={props.nextMonth}>Next</Button>
      </div>

      <div className="jump">
        <span>Jump to:&nbsp;</span>

        <select value={months[props.month]} onChange={selectedMonthHandler}>
          {months.map(month => (
            <option key={month}>{month}</option>
          ))}
        </select>

        <select value={props.year} onChange={selectedYearHandler}>
          {getYearsRangeOfTen().map(year => (
            <option key={year}>{year}</option>
          ))}
        </select>
      </div>
    </Aux>
  )
}

const mapStateToProps = state => {
  return {
    year: parseInt(state.common.date.year),
    month: parseInt(state.common.date.month),
    date: parseInt(state.common.date.date)
  }
}

export default connect(
  mapStateToProps,
  { selectYear, selectMonth, selectDate, previousMonth, nextMonth }
)(calendar)
