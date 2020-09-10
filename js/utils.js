const formatCustomDate = (dateToFormat) => {
    return dateToFormat.getFullYear()
        + "-" + (dateToFormat.getMonth() + 1)
        + "-" + dateToFormat.getDate() + " "
        + dateToFormat.getHours() + ":"
        + dateToFormat.getMinutes()
        + ":" + dateToFormat.getSeconds()
}

exports.formatCustomDate = formatCustomDate