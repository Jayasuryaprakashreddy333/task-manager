import  {  useState ,useEffect} from "react";
import {getInsights} from '../apiservices';

const Insights = () => {
  const [insights, setInsights] = useState(null);

  useEffect(() => {
    const fetchInsights = async () => {
      try {
        const data = await getInsights();
        setInsights(data);
      } catch (error) {
        alert("Error fetching insights");
        console.error("Error fetching insights:", error);
      }
    };

    fetchInsights();
  }, []);

  if (!insights) return <div className="p-6 text-gray-600">Loading insights...</div>;

  const { totalTasks, completed, inProgress, openTasks, highPriority, mediumPriority, lowPriority, overdueTasks, completionRate, totalTasksDueToday, totalTasksDueTomorrow, summary  } = insights;


  return (
    <div className="p-8 bg-gray-50 min-h-screen flex flex-col gap-6">
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-3"> Insight</h2>
        <p className="text-gray-700 italic whitespace-pre-line leading-relaxed">{`"${summary}"`}</p>
        <p><span>Total Tasks:</span> {totalTasks}</p>
        <p><span>Open:</span> {openTasks}</p>
        <p><span>In Progress:</span> {inProgress}</p>
        <p><span>Completed:</span> {completed}</p>
        <p><span>High Priority:</span> {highPriority}</p>
        <p><span>Medium Priority:</span> {mediumPriority}</p>
        <p><span>Low Priority:</span> {lowPriority}</p>
        <p><span>Completion Rate:</span> {completionRate}%</p>
        <p><span>Due Today:</span> {totalTasksDueToday}</p>
        <p><span>Due Tomorrow:</span> {totalTasksDueTomorrow}</p>
        <p><span>Overdue:</span> {overdueTasks}</p>
      </div>
    </div>
  );
};

export default Insights;
