import { ArrowUp, ArrowDown, Calendar } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useUser } from '../../contexts/UserContext';
import { formatNumber } from '../../utils/user';
import { getNearestMonday } from '../../utils/date';
import moment, { Moment } from 'moment';

interface Stat {
  label: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
}

interface TimeRange {
  label: string;
  value: string;
  start?: Moment;
  end?: Moment;
}

export function KeyMetrics() {
  const { users } = useUser();

  const [stats, setStats] = useState<Stat[]>([]);
  const [timeRange, setTimeRange] = useState<TimeRange>();
  const [timeRanges, setTimeRanges] = useState<TimeRange[]>([
    { label: '1 week', value: '1 week' },
    { label: '4 week', value: '4 week' },
    { label: 'MTD', value: 'MTD' },
    { label: 'QTD', value: 'QTD' },
    { label: 'YTD', value: 'YTD' },
  ]);

  useEffect(() => {
    setStats([
      {
        label: 'Total Users',
        value: formatNumber(users.length),
        change: '12%',
        trend: 'up',
      },
      {
        label: 'Active Users (MAU)',
        value: formatNumber(users.filter((user) => user.is_activated).length),
        change: '-5%',
        trend: 'down',
      },
      {
        label: 'New Users',
        value: formatNumber(
          users.filter((user) => {
            const registered_at = moment(user.registered_at);
            return (
              timeRange &&
              timeRange.start &&
              registered_at.unix() >= timeRange.start.unix() &&
              timeRange.end &&
              registered_at.unix() <= timeRange.end.unix()
            );
          }).length
        ),
        change: '10%',
        trend: 'up',
      },
      { label: 'Churn Rate', value: '5%', change: '2%', trend: 'down' },
      {
        label: 'Customer Lifetime Value (CLTV)',
        value: formatNumber('$500'),
        change: '3%',
        trend: 'up',
      },
      {
        label: 'Total Revenue',
        value: formatNumber('$5000'),
        change: '-8%',
        trend: 'down',
      },
      { label: 'Conversion Rate', value: '8%', change: '10%', trend: 'up' },
    ]);
  }, [timeRange]);

  useEffect(() => {
    setTimeRange(timeRanges[0]);
  }, [timeRanges]);

  useEffect(() => {
    if (users.length > 0) {
      initializeTimeRange();
    }
  }, [users]);

  const initializeTimeRange = () => {
    setTimeRanges(
      timeRanges.map((timeRange) => {
        let now = moment()
          .set('hour', 0)
          .set('minute', 0)
          .set('second', 0)
          .set('millisecond', 0);
        let day = now.weekday(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
        let diff = 0;

        switch (timeRange.value) {
          case '1 week':
            if (now.weekday() !== 1) {
              now = getNearestMonday(now);
              day = now.weekday();
            }
            diff = day === 1 ? -7 : 2 - day;
            break;
          case '4 week':
            diff = (day === 1 ? -7 : 2 - day) * 4;
            break;
          case 'MTD':
            const date = now.date();
            diff = -(date - 1);
            break;
          case 'QTD':
            const currentQuarter = Math.floor(now.month() / 3);
            const quarterStartMonth = currentQuarter * 3;
            const quarterStart = moment(now).month(quarterStartMonth).date(1);
            diff = -moment.duration(now.diff(quarterStart)).asDays();
            break;
          case 'YTD':
            const yearStart = moment(now).startOf('year');
            diff = -moment.duration(now.diff(yearStart)).asDays();
            break;
          default:
            break;
        }

        const start = moment(now);
        return { ...timeRange, start: start.add(diff, 'days'), end: now };
      })
    );
  };

  return (
    <>
      <div className="flex items-center justify-between mt-8 mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Key Metrics</h2>
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-gray-500" />
          <select
            value={timeRange?.value}
            onChange={(e) =>
              setTimeRange(
                timeRanges.find((prev) => prev.value === e.target.value)
              )
            }
            className="text-sm text-gray-600 border border-gray-200 rounded-lg px-2 py-1 bg-white hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent cursor-pointer"
          >
            {timeRanges.map((prev, idx) => (
              <option key={idx} value={prev.value}>
                {prev.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm"
          >
            <div className="text-sm font-medium text-gray-500 mb-1">
              {stat.label}
            </div>
            <div className="flex items-center">
              <div className="text-2xl font-semibold text-gray-800">
                {stat.value}
              </div>
              <div
                className={`ml-2 text-sm ${stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}
              >
                {stat.change}
                {stat.trend === 'up' ? (
                  <ArrowUp size={14} />
                ) : (
                  <ArrowDown size={14} />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
