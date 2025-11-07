import React from "react";
import { getFormattedDate } from "@/utils/date";

interface FormattedDateProps extends React.TimeHTMLAttributes<HTMLTimeElement> {
  date: Date;
  dateTimeOptions?: Intl.DateTimeFormatOptions;
}

const FormattedDate: React.FC<FormattedDateProps> = ({
  date,
  dateTimeOptions,
  ...attrs
}) => {
  const postDate = getFormattedDate(date, dateTimeOptions);
  const ISO = date.toISOString();

  return (
    <time dateTime={ISO} title={ISO} {...attrs}>
      {postDate}
    </time>
  );
};

export default FormattedDate;
