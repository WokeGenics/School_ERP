import AddClassRoutineForm from '../components/classRoutine/AddClassRoutineForm';
import ClassRoutineTable from '../components/classRoutine/ClassRoutineTable';

export default function ClassRoutinePage() {
  return (
    <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 p-6 bg-gray-50 min-h-screen">
      <AddClassRoutineForm />
      <ClassRoutineTable />
    </div>
  );
}
