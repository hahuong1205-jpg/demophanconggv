/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useRef } from 'react';
import { 
  Upload, 
  Download, 
  RefreshCw, 
  Plus, 
  Search, 
  Filter, 
  AlertTriangle, 
  CheckCircle, 
  Users, 
  BookOpen, 
  Clock, 
  Grid, 
  BarChart3, 
  Trash2, 
  AlertCircle, 
  Sparkles, 
  BookMarked,
  Layers,
  Check,
  ChevronDown,
  Info
} from 'lucide-react';

// Interfaces
interface ScheduleItem {
  id: string;
  mon: string;
  tenMon: string;
  lop: string;
  chuyenNganh: string;
  soSinhVien: number;
  part: string;
  giangVien: string;
  soGioAP: number;
}

// Initial default CSV data
const DEFAULT_CSV_TEXT = `Môn;Tên môn;Lớp;Chuyên ngành;Số sinh viên cần học;Part;Giảng viên;Số giờ AP
AMD201;"Advanced Microservices Development and Deployment
- System Design
- Microservices Architechture
- Cloud Computing";CO1303;3+0 COMP&AI;21;2 Part;longndt;45
AMD201;"Advanced Microservices Development and Deployment
- System Design
- Microservices Architechture
- Cloud Computing";CO1302;3+0 COMP&AI;28;2 Part;longndt;45
COMP1551;Application Development ;CO1304;3+0 COMP&AI;22;2 Part;cuonghd7;48
COMP1589;Computer Systems and Internet Technologies ;CO1403;;18;2 Part;thoatt6;48
COMP1589;Computer Systems and Internet Technologies ;CO1402;;18;2 Part;thoatt6;48
COMP1643 ;Information and Content Management ;CO1205-Eng;3+0;10;2 Part;nathb;36
COMP1649;Human Computer Interaction and Design;TCH2902;TopUp-IT;23;2 Part;nathb;36
COMP1649;Human Computer Interaction and Design;CO1301;3+0 COMP&AI;25;2 Part;nathb;36
COMP1682.1;Final Year Projects Part 1;TCH2902;TopUp-IT;12;2 Part;tungdt2;18
COMP1682.1;"Final Year Projects
- Proposal guidance and literature review
- Generative AI in application development";CO1205-Eng;3+0;7;2 Part;tungdt2;45
COMP1682.2;Final Year Projects Part 2 - Front-end;TCH2902.1;TopUp-IT;12;2 Part;longndt;15
COMP1682.2;Final Year Projects Part 2 - Back-end;TCH2902.2;TopUp-IT;12;2 Part;longndt;15
COMP1682.2;Final Year Projects Part 2 - Game;TCH2902.3;TopUp-IT;12;2 Part;longndt;15
COMP1682.2;"Final Year Projects
- Project supervision";CO1301.1;3+0 COMP&AI;25;2 Part;tungdt2;15
COMP1682.2;"Final Year Projects
- Project supervision";CO1301.2;3+0 COMP&AI;25;2 Part;longndt;15
COMP1682.2;"Final Year Projects
- Project supervision";CO1301.3;3+0 COMP&AI;25;2 Part;thoatt6;15
COMP1682.2;"Final Year Projects
- DevOps specialization";CO1301;3+0 COMP&AI;25;2 Part;longndt;15
COMP1682.3;Final Year Projects Part 3;TCH2901.1;TopUp-IT;11;2 Part;thoatt6;18
COMP1682.3;Final Year Projects Part 3;TCH2901.2;TopUp-IT;11;2 Part;longndt;18
COMP1682.3;Final Year Projects Part 3;COMP1682 RE FA26;TopUp-IT;7;2 Part;tungntl;18
COMP1682.3;Final Year Projects Part 3;CO1203-04-05 5;3+0;10;2 Part;thoatt6;18
COMP1682.3;Final Year Projects Part 3;CO1203-04-05 4;3+0;9;2 Part;thoatt6;18
COMP1682.3;Final Year Projects Part 3;CO1203-04-05 3;3+0;10;2 Part;huongvd6;18
COMP1682.3;Final Year Projects Part 3;CO1203-04-05 2;3+0;10;2 Part;huongvd6;18
COMP1682.3;Final Year Projects Part 3;CO1203-04-05 1;3+0;10;2 Part;quandh13;18
COMP1752;Object Oriented Programming ;CO1403;;18;2 Part;quandh13;48
COMP1752;Object Oriented Programming ;CO1402;;18;2 Part;quandh13;48
COMP1753;Programming Foundations ;CO1501;3+0;20;2 Part;tungdt2;48
COMP1770;Professional Project Management ;CO1401;3+0 COMP&AI;25;2 Part;thoatt6;48
COMP1773;User Interface Design ;CO1401;3+0 COMP&AI;25;2 Part;nathb;48
COMP1786;Mobile Application Design And Development;TCH2902;TopUp-IT;20;2 Part;longndt;36
COMP1786;Mobile Application Design And Development;CO1205-Eng;3+0;10;2 Part;longndt;36
COMP1787;Requirements Management;CO1301;3+0 COMP&AI;25;2 Part;omar;36
COMP1807;Agile Development with SCRUM ;CO1304;3+0 COMP&AI;22;2 Part;omar;48
COMP1810;Data and Web Analytics;CO1304;3+0 COMP;19;2 Part;quandh13;48
COMP1841;Web Programming 1 ;CO1401;3+0 COMP&AI;25;2 Part;huongvd6;48
COMP1842;Web Programming 2 ;CO1303;3+0 COMP&AI;21;2 Part;huongvd6;48
COMP1842;Web Programming 2 ;CO1302;3+0 COMP&AI;28;2 Part;thoatt6;48
COMP1843;Principles of Security ;CO1403;;18;2 Part;omar;48
COMP1843;Principles of Security ;CO1402;;18;2 Part;omar;48
COMP1844;Information Analysis and Visualisation ;CO1303;3+0 COMP&AI;21;2 Part;nathb;48
COMP1844;Information Analysis and Visualisation ;CO1302;3+0 COMP&AI;28;2 Part;nathb;48
COMP1845;Systems Development ;CO1404;3+0 COMP&AI;10;2 Part;tungntl;48
COMP1856;Software Engineering;CO1501;3+0;20;2 Part;tungntl;48
COMP1857;Introduction to Data Science;CO1404;3+0 COMP&AI;10;2 Part;omar;48
COMP1858;Data Structures and Algorithms;CO1303;3+0 COMP&AI;21;2 Part;quandh13;48
COMP1858;Data Structures and Algorithms;CO1302;3+0 COMP&AI;28;2 Part;quandh13;48
MACG101;Advanced math for Computer Science;CO1401;;10;2 Part;tungntl;45
MATH1179;Mathematics for Computer Science ;CO1404;3+0 COMP&AI;10;2 Part;tungntl;48`;

// Modern aesthetic palettes
const PALETTE_CLASSES = [
  '#3b82f6', // Indigo Blue
  '#0d9488', // Teal Dark
  '#10b981', // Emerald Green
  '#f59e0b', // Amber Orange
  '#d946ef', // Fuchsia Magenta
  '#8b5cf6', // Violet Purple
  '#f43f5e', // Rose Pink
  '#06b6d4', // Cyan Blue
  '#f97316', // Bright Orange
  '#14b8a6', // Teal
  '#6366f1', // Indigo
  '#a855f7', // Purple
  '#84cc16', // Lime
];

const PALETTE_SUBJECTS = [
  '#f97316', // Orange
  '#06b6d4', // Cyan
  '#a855f7', // Purple
  '#ec4899', // Pink
  '#10b981', // Emerald
  '#3b82f6', // Blue
  '#84cc16', // Lime
  '#eab308', // Yellow
  '#6366f1', // Indigo
  '#f43f5e', // Rose
  '#14b8a6', // Teal
  '#8b5cf6', // Violet
];

// Helper to get deterministic colors for classes and subjects
function getClassColor(className: string): string {
  if (!className) return '#94a3b8'; // Slate
  let hash = 0;
  for (let i = 0; i < className.length; i++) {
    hash = className.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % PALETTE_CLASSES.length;
  return PALETTE_CLASSES[index];
}

function getSubjectColor(subjectCode: string): string {
  if (!subjectCode) return '#64748b'; // Slate
  let hash = 0;
  const trimmed = subjectCode.trim().split(' ')[0] || '';
  for (let i = 0; i < trimmed.length; i++) {
    hash = trimmed.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % PALETTE_SUBJECTS.length;
  return PALETTE_SUBJECTS[index];
}

// Custom Safe CSV Parser
function parseCSV(text: string): ScheduleItem[] {
  const lines: string[] = [];
  let currentLine = '';
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === '\n' && !inQuotes) {
      lines.push(currentLine.trim());
      currentLine = '';
      continue;
    }
    currentLine += char;
  }
  if (currentLine) {
    lines.push(currentLine.trim());
  }

  const result: ScheduleItem[] = [];
  // Find where table header or actual records start
  const headerIndex = lines.findIndex(l => {
    const lower = l.toLowerCase();
    return lower.includes('môn') || lower.includes('giảng viên') || lower.includes('lớp');
  });
  const startRow = headerIndex !== -1 ? headerIndex + 1 : 0;

  for (let i = startRow; i < lines.length; i++) {
    const line = lines[i];
    if (!line) continue;

    const cells: string[] = [];
    let currentCell = '';
    let cellInQuotes = false;

    for (let j = 0; j < line.length; j++) {
      const c = line[j];
      if (c === '"') {
        cellInQuotes = !cellInQuotes;
      } else if (c === ';' && !cellInQuotes) {
        cells.push(currentCell.trim());
        currentCell = '';
      } else {
        currentCell += c;
      }
    }
    cells.push(currentCell.trim());

    if (cells.length >= 7) {
      const mon = cells[0] || '';
      const tenMonRaw = cells[1] || '';
      const tenMon = tenMonRaw.replace(/^"|"$/g, '').trim();
      const lop = cells[2] || '';
      const chuyenNganh = cells[3] || '';
      const soSinhVien = parseInt(cells[4]) || 0;
      const part = cells[5] || '';
      const giangVien = (cells[6] || '').trim() || 'Chưa phân công';
      const soGioAP = parseInt(cells[7]) || 0;

      result.push({
        id: `row-${i}-${mon}-${lop}-${Math.random().toString(36).substr(2, 4)}`,
        mon,
        tenMon,
        lop,
        chuyenNganh,
        soSinhVien,
        part,
        giangVien,
        soGioAP
      });
    }
  }
  return result;
}

export default function App() {
  const [schedule, setSchedule] = useState<ScheduleItem[]>(() => parseCSV(DEFAULT_CSV_TEXT));
  const [activeTab, setActiveTab] = useState<'assignment' | 'lecturer' | 'subject' | 'class'>('assignment');
  
  // Table search & filters
  const [searchTerm, setSearchTerm] = useState('');
  const [filterClass, setFilterClass] = useState('ALL');
  const [filterLecturer, setFilterLecturer] = useState('ALL');

  // Drag over CSV dropzone state
  const [isDragOver, setIsDragOver] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  // New Lecturer Add Input
  const [newLecturerName, setNewLecturerName] = useState('');
  const [isAddingLecturer, setIsAddingLecturer] = useState(false);

  // Add Row Modal Form State
  const [isAddRowModalOpen, setIsAddRowModalOpen] = useState(false);
  const [newRowForm, setNewRowForm] = useState({
    mon: 'AMD201',
    tenMon: 'Advanced Microservices Development and Deployment',
    lop: 'CO1305',
    chuyenNganh: '3+0 COMP&AI',
    soSinhVien: '20',
    part: '2 Part',
    giangVien: 'Chưa phân công',
    soGioAP: '45'
  });

  // Custom Chart Hover States
  const [hoveredHourBar, setHoveredHourBar] = useState<{
    lecturer: string;
    details: { name: string; val: number; color: string }[];
    total: number;
    x: number;
    y: number;
  } | null>(null);

  const [hoveredClassBar, setHoveredClassBar] = useState<{
    lecturer: string;
    details: { name: string; val: number; color: string }[];
    total: number;
    x: number;
    y: number;
  } | null>(null);

  const [hoveredSubjectBar, setHoveredSubjectBar] = useState<{
    lecturer: string;
    details: { name: string; val: number; color: string }[];
    total: number;
    x: number;
    y: number;
  } | null>(null);

  // Trigger brief Toast message
  const triggerToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  // Helper arrays extracted dynamically from the schedule
  const allLecturers = useMemo(() => {
    const list = new Set<string>();
    schedule.forEach(item => {
      if (item.giangVien && item.giangVien !== 'Chưa phân công') {
        list.add(item.giangVien);
      }
    });
    return Array.from(list).sort();
  }, [schedule]);

  const allUniqueClasses = useMemo(() => {
    const list = new Set<string>();
    schedule.forEach(item => {
      if (item.lop) list.add(item.lop);
    });
    return Array.from(list).sort();
  }, [schedule]);

  const allUniqueSubjects = useMemo(() => {
    const list = new Map<string, string>(); // code -> name
    schedule.forEach(item => {
      if (item.mon) {
        list.set(item.mon.trim(), item.tenMon.trim());
      }
    });
    return Array.from(list.entries()).map(([code, name]) => ({ code, name }));
  }, [schedule]);

  // CSV file import handling
  const handleCSVUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    readAndParseCSVFile(file);
  };

  const readAndParseCSVFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      if (!text) {
        triggerToast('Không thể đọc dữ liệu file CSV', 'error');
        return;
      }
      try {
        const parsed = parseCSV(text);
        if (parsed.length === 0) {
          triggerToast('File CSV không đúng định dạng hoặc không có dữ liệu phù hợp. Vui lòng kiểm tra lại cấu trúc các cột.', 'error');
          return;
        }
        setSchedule(parsed);
        triggerToast(`Tải file thành công! Đã nhập ${parsed.length} dòng phân công mới.`, 'success');
      } catch (err) {
        triggerToast('Lỗi khi phân tích cú pháp CSV', 'error');
      }
    };
    reader.readAsText(file, 'UTF-8');
  };

  // Drag & drop support
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      if (file.name.endsWith('.csv')) {
        readAndParseCSVFile(file);
      } else {
        triggerToast('Vui lòng chỉ tải lên tập tin định dạng .csv', 'error');
      }
    }
  };

  // Export back as CSV
  const handleCSVExport = () => {
    if (schedule.length === 0) {
      triggerToast('Không có dữ liệu để xuất', 'error');
      return;
    }

    const headers = 'Môn;Tên môn;Lớp;Chuyên ngành;Số sinh viên cần học;Part;Giảng viên;Số giờ AP';
    const rows = schedule.map(item => {
      // Escape inner quotes inside subject name
      const escapedSubjectName = item.tenMon.includes('\n') || item.tenMon.includes('"') || item.tenMon.includes(';')
        ? `"${item.tenMon.replace(/"/g, '""')}"`
        : item.tenMon;
      return `${item.mon};${escapedSubjectName};${item.lop};${item.chuyenNganh};${item.soSinhVien};${item.part};${item.giangVien};${item.soGioAP}`;
    });

    const csvContent = '\ufeff' + [headers, ...rows].join('\n'); // Add BOM for Excel UTF-8 support
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Phan_Cong_Lich_Day_Export_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    triggerToast('Đã tải xuống file CSV phân công cập nhật!', 'success');
  };

  // Restore Default Dataset
  const handleResetToDefault = () => {
    if (window.confirm('Bạn có chắc chắn muốn khôi phục danh sách phân công mặc định ban đầu không?')) {
      setSchedule(parseCSV(DEFAULT_CSV_TEXT));
      setSearchTerm('');
      setFilterClass('ALL');
      setFilterLecturer('ALL');
      triggerToast('Đã khôi phục dữ liệu phân công mặc định!', 'info');
    }
  };

  // Change Assignment handler
  const handleAssignLecturer = (rowId: string, lecturer: string) => {
    setSchedule(prev => prev.map(item => {
      if (item.id === rowId) {
        return { ...item, giangVien: lecturer };
      }
      return item;
    }));
    triggerToast(`Đã cập nhật phân công giảng viên: ${lecturer}`, 'success');
  };

  // Add new row handler
  const handleAddRowSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newRow: ScheduleItem = {
      id: `custom-row-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      mon: newRowForm.mon.trim(),
      tenMon: newRowForm.tenMon.trim(),
      lop: newRowForm.lop.trim(),
      chuyenNganh: newRowForm.chuyenNganh.trim(),
      soSinhVien: parseInt(newRowForm.soSinhVien) || 0,
      part: newRowForm.part.trim(),
      giangVien: newRowForm.giangVien.trim(),
      soGioAP: parseInt(newRowForm.soGioAP) || 0,
    };

    if (!newRow.mon || !newRow.tenMon || !newRow.lop) {
      alert('Vui lòng điền đầy đủ Mã môn, Tên môn và Lớp!');
      return;
    }

    setSchedule(prev => [newRow, ...prev]);
    setIsAddRowModalOpen(false);
    triggerToast(`Đã thêm mới lớp học ${newRow.mon} - ${newRow.lop} vào danh sách!`, 'success');
  };

  // Delete row from schedule
  const handleDeleteRow = (id: string, detail: string) => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa phân công cho lớp học: ${detail}?`)) {
      setSchedule(prev => prev.filter(item => item.id !== id));
      triggerToast(`Đã xóa thành công dòng phân công.`, 'info');
    }
  };

  // Create Custom New Lecturer
  const handleCreateNewLecturer = () => {
    const trimmed = newLecturerName.trim();
    if (!trimmed) {
      alert('Vui lòng nhập tên giảng viên!');
      return;
    }
    if (allLecturers.includes(trimmed)) {
      alert('Giảng viên này đã tồn tại trong hệ thống!');
      return;
    }
    // Since lecturers are extracted dynamically, we just assign this new lecturer to some unassigned row,
    // or keep a local state of "custom lecturers list". To make it super simple and natural, 
    // we can temporarily allow user to select it. But to make sure it is immediately available,
    // we can add it to the active list by letting the dropdown list also read from a custom lecturer state
    // if needed. Let's just append it to a list or let the user choose it.
    // An elegant approach: keep an array of extra lecturers in state!
    setExtraLecturers(prev => [...prev, trimmed]);
    setNewLecturerName('');
    setIsAddingLecturer(false);
    triggerToast(`Đã thêm giảng viên "${trimmed}" vào danh sách lựa chọn!`, 'success');
  };

  const [extraLecturers, setExtraLecturers] = useState<string[]>([]);
  const combinedLecturerList = useMemo(() => {
    const combined = new Set([...allLecturers, ...extraLecturers]);
    return Array.from(combined).sort();
  }, [allLecturers, extraLecturers]);


  // 1. Filtering logic for assignment table
  const filteredSchedule = useMemo(() => {
    return schedule.filter(item => {
      const matchSearch = 
        item.mon.toLowerCase().includes(searchTerm.toLowerCase()) || 
        item.tenMon.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.lop.toLowerCase().includes(searchTerm.toLowerCase());

      const matchClass = filterClass === 'ALL' || item.lop === filterClass;
      const matchLecturer = filterLecturer === 'ALL' || item.giangVien === filterLecturer;

      return matchSearch && matchClass && matchLecturer;
    });
  }, [schedule, searchTerm, filterClass, filterLecturer]);


  // Global statistics metrics
  const stats = useMemo(() => {
    const totalHours = schedule.reduce((sum, item) => sum + item.soGioAP, 0);
    const totalStudents = schedule.reduce((sum, item) => sum + item.soSinhVien, 0);
    const assignedHours = schedule
      .filter(item => item.giangVien && item.giangVien !== 'Chưa phân công')
      .reduce((sum, item) => sum + item.soGioAP, 0);
    
    return {
      totalClasses: allUniqueClasses.length,
      totalSubjects: allUniqueSubjects.length,
      totalLecturers: allLecturers.length,
      totalHours,
      assignedHours,
      percentAssigned: totalHours > 0 ? Math.round((assignedHours / totalHours) * 100) : 0,
      totalStudents
    };
  }, [schedule, allUniqueClasses, allUniqueSubjects, allLecturers]);


  // Dynamic Live Chart Data for Lecturer Assignment (Total AP Hours per lecturer)
  const lecturerHoursData = useMemo(() => {
    const hoursMap: { [key: string]: number } = {};
    // Seed with all known lecturers
    combinedLecturerList.forEach(name => { hoursMap[name] = 0; });
    hoursMap['Chưa phân công'] = 0;

    schedule.forEach(item => {
      const gv = item.giangVien || 'Chưa phân công';
      hoursMap[gv] = (hoursMap[gv] || 0) + item.soGioAP;
    });

    return Object.entries(hoursMap)
      .map(([name, hours]) => ({ name, hours }))
      .sort((a, b) => b.hours - a.hours);
  }, [schedule, combinedLecturerList]);


  // 2. Tab Lecturer: Stacked Chart calculations
  // A. Lecturer AP Hours Stacked by Class
  const lecturerHoursStackedByClass = useMemo(() => {
    // Generate data structure for each lecturer
    // { lecturerName, total: number, stacks: { [className]: hours } }
    const list: { lecturer: string; total: number; stacks: { name: string; val: number; color: string }[] }[] = [];

    // Filter out "Chưa phân công" for visual elegance or keep it. Let's filter out to focus on actual lecturers.
    const activeTeachers = combinedLecturerList;

    activeTeachers.forEach(teacher => {
      const assignments = schedule.filter(item => item.giangVien === teacher);
      const totalHours = assignments.reduce((s, i) => s + i.soGioAP, 0);
      
      // Group assignments by class code
      const classHours: { [key: string]: number } = {};
      assignments.forEach(item => {
        classHours[item.lop] = (classHours[item.lop] || 0) + item.soGioAP;
      });

      const stacks = Object.entries(classHours).map(([className, hrs]) => ({
        name: className,
        val: hrs,
        color: getClassColor(className)
      }));

      list.push({
        lecturer: teacher,
        total: totalHours,
        stacks: stacks.sort((a, b) => b.val - a.val)
      });
    });

    return list.sort((a, b) => b.total - a.total);
  }, [schedule, combinedLecturerList]);

  // B. Lecturer Classes Count Stacked by Subject (different subjects)
  const lecturerClassesStackedBySubject = useMemo(() => {
    const list: { lecturer: string; total: number; stacks: { name: string; val: number; color: string }[] }[] = [];

    combinedLecturerList.forEach(teacher => {
      const assignments = schedule.filter(item => item.giangVien === teacher);
      const totalClassesCount = assignments.length;

      // Group by Subject Code
      const subjectClasses: { [key: string]: number } = {};
      assignments.forEach(item => {
        subjectClasses[item.mon] = (subjectClasses[item.mon] || 0) + 1; // Count of classes teaching this subject
      });

      const stacks = Object.entries(subjectClasses).map(([subjCode, count]) => ({
        name: subjCode,
        val: count,
        color: getSubjectColor(subjCode)
      }));

      list.push({
        lecturer: teacher,
        total: totalClassesCount,
        stacks: stacks.sort((a, b) => b.val - a.val)
      });
    });

    return list.sort((a, b) => b.total - a.total);
  }, [schedule, combinedLecturerList]);

  // C. Lecturer Subjects Count Stacked by Class
  const lecturerSubjectsStackedByClass = useMemo(() => {
    const list: { lecturer: string; total: number; stacks: { name: string; val: number; color: string }[] }[] = [];

    combinedLecturerList.forEach(teacher => {
      const assignments = schedule.filter(item => item.giangVien === teacher);
      
      // Get unique subjects taught
      const uniqueSubjects = Array.from(new Set(assignments.map(item => item.mon)));
      const totalSubjectsCount = uniqueSubjects.length;

      // Stack: For each subject, which classes are taught? Or stack unique subjects taught per Class
      // For a class, how many unique subjects does this teacher teach?
      const classSubjectMap: { [key: string]: Set<string> } = {};
      assignments.forEach(item => {
        if (!classSubjectMap[item.lop]) {
          classSubjectMap[item.lop] = new Set<string>();
        }
        classSubjectMap[item.lop].add(item.mon);
      });

      const stacks = Object.entries(classSubjectMap).map(([className, subjSet]) => ({
        name: className,
        val: subjSet.size, // count of unique subjects taught for this class
        color: getClassColor(className)
      }));

      list.push({
        lecturer: teacher,
        total: totalSubjectsCount,
        stacks: stacks.sort((a, b) => b.val - a.val)
      });
    });

    return list.sort((a, b) => b.total - a.total);
  }, [schedule, combinedLecturerList]);


  // 3. Tab Subject: Subject statistics, enrollment, lecturer counts
  const subjectAnalysisData = useMemo(() => {
    const map = new Map<string, {
      code: string;
      name: string;
      totalStudents: number;
      uniqueLecturers: Set<string>;
      classes: string[];
    }>();

    schedule.forEach(item => {
      const code = item.mon.trim();
      const name = item.tenMon.trim();
      if (!map.has(code)) {
        map.set(code, {
          code,
          name,
          totalStudents: 0,
          uniqueLecturers: new Set<string>(),
          classes: []
        });
      }
      const val = map.get(code)!;
      val.totalStudents += item.soSinhVien;
      if (item.giangVien && item.giangVien !== 'Chưa phân công') {
        val.uniqueLecturers.add(item.giangVien);
      }
      val.classes.push(item.lop);
    });

    const parsedList = Array.from(map.values()).map(item => ({
      ...item,
      lecturersCount: item.uniqueLecturers.size,
      lecturerList: Array.from(item.uniqueLecturers).join(', ') || 'Chưa phân công'
    }));

    // Find subject with most and least lecturers
    let mostLecturerSubj = parsedList[0];
    let leastLecturerSubj = parsedList[0];

    parsedList.forEach(item => {
      if (!mostLecturerSubj || item.lecturersCount > mostLecturerSubj.lecturersCount) {
        mostLecturerSubj = item;
      }
      // For least, we might only want to count subjects that actually have lecturers, 
      // or simply the minimum value among all subjects
      if (!leastLecturerSubj || item.lecturersCount < leastLecturerSubj.lecturersCount) {
        leastLecturerSubj = item;
      }
    });

    return {
      list: parsedList.sort((a, b) => b.totalStudents - a.totalStudents),
      mostLecturerSubj,
      leastLecturerSubj
    };
  }, [schedule]);


  // 4. Tab Class: Class overview with repeating lecturer detection
  const classAnalysisData = useMemo(() => {
    const list: {
      className: string;
      totalSubjects: number;
      subjects: { mon: string; tenMon: string; giangVien: string; hours: number }[];
      repeatingLecturers: { name: string; count: number; subjects: string[] }[];
      hasConflict: boolean;
    }[] = [];

    allUniqueClasses.forEach(className => {
      const classRows = schedule.filter(item => item.lop === className);
      const subjectsInClass = classRows.map(item => ({
        mon: item.mon,
        tenMon: item.tenMon,
        giangVien: item.giangVien || 'Chưa phân công',
        hours: item.soGioAP
      }));

      // Count lecturers in this specific class
      const lecturerCounts: { [key: string]: string[] } = {}; // lecturerName -> array of subject codes
      classRows.forEach(item => {
        const gv = item.giangVien;
        if (gv && gv !== 'Chưa phân công') {
          if (!lecturerCounts[gv]) {
            lecturerCounts[gv] = [];
          }
          lecturerCounts[gv].push(item.mon);
        }
      });

      const repeatingLecturers = Object.entries(lecturerCounts)
        .filter(([_, subjs]) => subjs.length > 1)
        .map(([name, subjs]) => ({
          name,
          count: subjs.length,
          subjects: Array.from(new Set(subjs))
        }));

      list.push({
        className,
        totalSubjects: subjectsInClass.length,
        subjects: subjectsInClass,
        repeatingLecturers,
        hasConflict: repeatingLecturers.length > 0
      });
    });

    return list;
  }, [schedule, allUniqueClasses]);

  // Overall repeating conflicts stats
  const classesWithConflicts = useMemo(() => {
    return classAnalysisData.filter(c => c.hasConflict);
  }, [classAnalysisData]);


  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col antialiased font-sans" id="app_root">
      
      {/* Dynamic Toast System */}
      {toast && (
        <div 
          id="toast_notification"
          className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-4 rounded-xl shadow-2xl transition-all duration-300 animate-bounce ${
            toast.type === 'success' ? 'bg-emerald-600 text-white' :
            toast.type === 'error' ? 'bg-rose-600 text-white' :
            'bg-slate-800 text-white'
          }`}
        >
          {toast.type === 'success' && <CheckCircle className="w-5 h-5 flex-shrink-0" />}
          {toast.type === 'error' && <AlertCircle className="w-5 h-5 flex-shrink-0" />}
          {toast.type === 'info' && <Sparkles className="w-5 h-5 flex-shrink-0" />}
          <p className="text-sm font-semibold tracking-wide">{toast.message}</p>
        </div>
      )}

      {/* Main Premium Navbar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm" id="main_header">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            
            {/* Logo and App Meta */}
            <div className="flex items-center gap-3">
              <div className="bg-teal-600 text-white p-2.5 rounded-xl shadow-md shadow-teal-100 flex items-center justify-center">
                <BookMarked className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-xl font-extrabold tracking-tight text-slate-900 flex items-center gap-2">
                  Trực quan hóa & Phân công Lịch dạy
                  <span className="bg-teal-50 text-teal-700 text-xs font-semibold px-2 py-0.5 rounded-full border border-teal-200">
                    Trưởng Bộ Môn
                  </span>
                </h1>
                <p className="text-xs text-slate-500 mt-0.5">
                  Quản lý phân công giảng dạy, tối ưu hóa giờ dạy và phân tích trực quan hóa xung đột lớp học.
                </p>
              </div>
            </div>

            {/* Quick Actions Panel */}
            <div className="flex flex-wrap items-center gap-2">
              
              {/* Reset to Default */}
              <button
                id="btn_reset_default"
                onClick={handleResetToDefault}
                className="flex items-center gap-1.5 px-3.5 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors shadow-sm cursor-pointer"
                title="Khôi phục dữ liệu gốc"
              >
                <RefreshCw className="w-4 h-4 text-slate-500" />
                <span className="hidden sm:inline">Khôi phục gốc</span>
              </button>

              {/* Add Assignment Row */}
              <button
                id="btn_add_row"
                onClick={() => setIsAddRowModalOpen(true)}
                className="flex items-center gap-1.5 px-3.5 py-2 text-sm font-medium text-teal-700 bg-teal-50 border border-teal-200 rounded-xl hover:bg-teal-100 transition-colors shadow-sm cursor-pointer"
              >
                <Plus className="w-4 h-4 text-teal-600" />
                <span>Thêm lớp dạy</span>
              </button>

              {/* Export Button */}
              <button
                id="btn_export_csv"
                onClick={handleCSVExport}
                className="flex items-center gap-1.5 px-3.5 py-2 text-sm font-medium text-white bg-slate-900 rounded-xl hover:bg-slate-800 transition-all shadow-md cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Xuất file CSV</span>
              </button>

              {/* Import CSV Trigger */}
              <label 
                htmlFor="csv_file_input" 
                className="flex items-center gap-1.5 px-3.5 py-2 text-sm font-medium text-white bg-teal-600 rounded-xl hover:bg-teal-700 transition-all shadow-md shadow-teal-50 cursor-pointer"
              >
                <Upload className="w-4 h-4" />
                <span>Tải lên CSV</span>
                <input
                  type="file"
                  id="csv_file_input"
                  accept=".csv"
                  onChange={handleCSVUpload}
                  className="hidden"
                />
              </label>

            </div>

          </div>
        </div>
      </header>

      {/* Statistics Indicator Band */}
      <section className="bg-slate-100 border-b border-slate-200 py-6" id="stats_band">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            
            <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-sm flex items-center gap-3.5">
              <div className="p-2.5 bg-blue-50 text-blue-600 rounded-lg">
                <Grid className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block">Tổng số lớp</span>
                <span className="text-lg font-extrabold text-slate-900">{stats.totalClasses}</span>
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-sm flex items-center gap-3.5">
              <div className="p-2.5 bg-violet-50 text-violet-600 rounded-lg">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block">Môn học học kỳ</span>
                <span className="text-lg font-extrabold text-slate-900">{stats.totalSubjects}</span>
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-sm flex items-center gap-3.5">
              <div className="p-2.5 bg-teal-50 text-teal-600 rounded-lg">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block">Giảng viên</span>
                <span className="text-lg font-extrabold text-slate-900">{stats.totalLecturers}</span>
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-sm flex items-center gap-3.5">
              <div className="p-2.5 bg-amber-50 text-amber-600 rounded-lg">
                <Clock className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block">Tổng giờ dạy AP</span>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-lg font-extrabold text-slate-900">{stats.totalHours}</span>
                  <span className="text-xs text-slate-400">giờ</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-sm flex items-center gap-3.5 col-span-2 md:col-span-1">
              <div className="p-2.5 bg-rose-50 text-rose-600 rounded-lg">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block">Lớp trùng GV</span>
                <span className={`text-lg font-extrabold block ${classesWithConflicts.length > 0 ? 'text-amber-600' : 'text-emerald-600'}`}>
                  {classesWithConflicts.length} / {stats.totalClasses} Lớp
                </span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Main Drag-and-Drop Area Wrapper */}
      <main 
        className={`flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 transition-colors ${
          isDragOver ? 'bg-teal-50/50 border-2 border-dashed border-teal-400 rounded-3xl' : ''
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        id="main_container"
      >
        {isDragOver && (
          <div className="absolute inset-0 bg-teal-50/70 z-40 flex flex-col items-center justify-center pointer-events-none">
            <Upload className="w-16 h-16 text-teal-600 animate-bounce mb-3" />
            <h3 className="text-xl font-extrabold text-teal-900">Thả file .csv vào đây</h3>
            <p className="text-sm text-teal-700 mt-1">Hệ thống sẽ tự động cập nhật bảng phân công giảng dạy!</p>
          </div>
        )}

        {/* Tab Selection Row */}
        <div className="flex border-b border-slate-200 mb-8 overflow-x-auto scrollbar-thin" id="tabs_navigation">
          
          <button
            id="tab_trigger_assignment"
            onClick={() => setActiveTab('assignment')}
            className={`flex items-center gap-2 px-6 py-4 border-b-2 font-bold text-sm whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'assignment' 
                ? 'border-teal-600 text-teal-700 bg-white shadow-xs rounded-t-xl' 
                : 'border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300'
            }`}
          >
            <Grid className="w-4 h-4" />
            <span>📋 Phân công Lịch dạy</span>
          </button>

          <button
            id="tab_trigger_lecturer"
            onClick={() => setActiveTab('lecturer')}
            className={`flex items-center gap-2 px-6 py-4 border-b-2 font-bold text-sm whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'lecturer' 
                ? 'border-teal-600 text-teal-700 bg-white shadow-xs rounded-t-xl' 
                : 'border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>👨‍🏫 Phân tích Giảng viên</span>
          </button>

          <button
            id="tab_trigger_subject"
            onClick={() => setActiveTab('subject')}
            className={`flex items-center gap-2 px-6 py-4 border-b-2 font-bold text-sm whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'subject' 
                ? 'border-teal-600 text-teal-700 bg-white shadow-xs rounded-t-xl' 
                : 'border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>📚 Phân tích Môn học</span>
          </button>

          <button
            id="tab_trigger_class"
            onClick={() => setActiveTab('class')}
            className={`flex items-center gap-2 px-6 py-4 border-b-2 font-bold text-sm whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'class' 
                ? 'border-teal-600 text-teal-700 bg-white shadow-xs rounded-t-xl' 
                : 'border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>🏫 Phân tích Lớp học</span>
            {classesWithConflicts.length > 0 && (
              <span className="bg-amber-100 text-amber-800 text-xs font-extrabold px-2 py-0.5 rounded-full border border-amber-200">
                {classesWithConflicts.length}
              </span>
            )}
          </button>

        </div>


        {/* ========================================================= */}
        {/* TAB 1: PHÂN CÔNG LỊCH DẠY (BẢNG & DYNAMIC AP HOURS CHART) */}
        {/* ========================================================= */}
        {activeTab === 'assignment' && (
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8" id="view_assignment_tab">
            
            {/* Table and Filter side (8 Cols) */}
            <div className="xl:col-span-8 flex flex-col gap-4">
              
              {/* Filter Card */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
                
                {/* Search Bar */}
                <div className="relative w-full md:w-72">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-slate-400" />
                  </span>
                  <input
                    type="text"
                    placeholder="Tìm mã môn, tên môn, lớp..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all"
                  />
                </div>

                {/* Dropdown Filters */}
                <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                  
                  {/* Class Filter */}
                  <div className="flex items-center gap-1.5 w-full sm:w-auto">
                    <span className="text-xs font-bold text-slate-500 whitespace-nowrap">Lớp:</span>
                    <select
                      value={filterClass}
                      onChange={(e) => setFilterClass(e.target.value)}
                      className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    >
                      <option value="ALL">Tất cả lớp ({allUniqueClasses.length})</option>
                      {allUniqueClasses.map(cls => (
                        <option key={cls} value={cls}>{cls}</option>
                      ))}
                    </select>
                  </div>

                  {/* Lecturer Filter */}
                  <div className="flex items-center gap-1.5 w-full sm:w-auto">
                    <span className="text-xs font-bold text-slate-500 whitespace-nowrap">Giảng viên:</span>
                    <select
                      value={filterLecturer}
                      onChange={(e) => setFilterLecturer(e.target.value)}
                      className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    >
                      <option value="ALL">Tất cả giảng viên ({combinedLecturerList.length})</option>
                      <option value="Chưa phân công">Chưa phân công</option>
                      {combinedLecturerList.map(name => (
                        <option key={name} value={name}>{name}</option>
                      ))}
                    </select>
                  </div>

                </div>

              </div>

              {/* Assignments Table List */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto max-h-[600px] scrollbar-thin">
                  <table className="w-full text-left border-collapse">
                    <thead className="bg-slate-50 border-b border-slate-200 sticky top-0 z-10">
                      <tr>
                        <th className="px-5 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Môn học</th>
                        <th className="px-5 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider hidden sm:table-cell">Lớp & Ngành</th>
                        <th className="px-5 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Số SV & Giờ</th>
                        <th className="px-5 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Giảng viên đảm nhận</th>
                        <th className="px-5 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Thao tác</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredSchedule.length === 0 ? (
                        <tr>
                          <td colSpan={5} className="px-5 py-12 text-center text-slate-400">
                            <BookOpen className="w-10 h-10 mx-auto opacity-30 mb-3" />
                            <p className="text-sm font-medium">Không tìm thấy phân công nào khớp với điều kiện lọc.</p>
                            <button 
                              onClick={() => { setSearchTerm(''); setFilterClass('ALL'); setFilterLecturer('ALL'); }}
                              className="text-xs text-teal-600 underline font-bold mt-2 hover:text-teal-800"
                            >
                              Xóa tất cả bộ lọc
                            </button>
                          </td>
                        </tr>
                      ) : (
                        filteredSchedule.map(item => (
                          <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                            
                            {/* Subject Code & Name */}
                            <td className="px-5 py-4">
                              <div className="flex items-start gap-2.5">
                                <span 
                                  className="text-xs font-bold px-2 py-1 rounded-md tracking-wider text-white"
                                  style={{ backgroundColor: getSubjectColor(item.mon) }}
                                >
                                  {item.mon}
                                </span>
                                <div>
                                  <div className="text-sm font-bold text-slate-950 max-w-xs line-clamp-2" title={item.tenMon}>
                                    {item.tenMon}
                                  </div>
                                  <div className="text-xs text-slate-400 mt-0.5 sm:hidden">
                                    Lớp {item.lop} • {item.chuyenNganh || 'Đại trà'}
                                  </div>
                                </div>
                              </div>
                            </td>

                            {/* Class and Specialization */}
                            <td className="px-5 py-4 hidden sm:table-cell">
                              <span className="text-sm font-semibold text-slate-900 block">{item.lop}</span>
                              <span className="text-xs text-slate-400 block max-w-[120px] truncate" title={item.chuyenNganh}>
                                {item.chuyenNganh || '—'}
                              </span>
                            </td>

                            {/* Students & AP Hours */}
                            <td className="px-5 py-4">
                              <div className="flex flex-col">
                                <span className="text-sm text-slate-800 font-medium">
                                  👥 <strong className="text-slate-950">{item.soSinhVien}</strong> sv
                                </span>
                                <span className="text-xs text-slate-500 font-medium mt-0.5">
                                  ⏱️ <strong className="text-teal-700">{item.soGioAP}</strong> giờ
                                </span>
                              </div>
                            </td>

                            {/* Assignment Dropdown Selector */}
                            <td className="px-5 py-4">
                              <div className="relative">
                                <select
                                  value={item.giangVien || 'Chưa phân công'}
                                  onChange={(e) => {
                                    if (e.target.value === 'ADD_NEW') {
                                      setIsAddingLecturer(true);
                                      return;
                                    }
                                    handleAssignLecturer(item.id, e.target.value);
                                  }}
                                  className={`text-xs font-bold rounded-lg px-2.5 py-1.5 border w-44 transition-all focus:ring-2 focus:ring-teal-500 focus:outline-none appearance-none cursor-pointer pr-8 ${
                                    item.giangVien === 'Chưa phân công' 
                                      ? 'bg-amber-50 text-amber-800 border-amber-200' 
                                      : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                                  }`}
                                >
                                  <option value="Chưa phân công">⚠️ Chưa phân công</option>
                                  {combinedLecturerList.map(name => (
                                    <option key={name} value={name}>👨‍🏫 {name}</option>
                                  ))}
                                  <option value="ADD_NEW" className="font-semibold text-teal-600 bg-teal-50">
                                    ➕ Thêm giảng viên mới...
                                  </option>
                                </select>
                                <div className="absolute inset-y-0 right-2 flex items-center pointer-events-none text-slate-500">
                                  <ChevronDown className="w-3.5 h-3.5" />
                                </div>
                              </div>
                            </td>

                            {/* Actions */}
                            <td className="px-5 py-4 text-right">
                              <button
                                onClick={() => handleDeleteRow(item.id, `${item.mon} - ${item.lop}`)}
                                className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer inline-block"
                                title="Xóa phân công này"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </td>

                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>

                <div className="bg-slate-50 px-5 py-3 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500 font-semibold">
                  <span>Hiển thị {filteredSchedule.length} trên tổng số {schedule.length} dòng phân công</span>
                  <span>Nhấp đúp chuột hoặc dùng dropdown để thay đổi giảng viên</span>
                </div>

              </div>

            </div>

            {/* Dynamic Chart side (4 Cols) */}
            <div className="xl:col-span-4 flex flex-col gap-6">
              
              {/* Informational Widget */}
              <div className="bg-teal-900 text-white p-6 rounded-2xl shadow-md relative overflow-hidden">
                <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none transform translate-y-4 translate-x-4">
                  <Clock className="w-44 h-44" />
                </div>
                <h3 className="text-lg font-extrabold flex items-center gap-2">
                  <Clock className="w-5 h-5 text-teal-300" /> Cập nhật động AP Hours
                </h3>
                <p className="text-xs text-teal-200 mt-2 leading-relaxed">
                  Tổng thời gian giảng dạy của từng thầy cô sẽ tự động cộng dồn và cập nhật lập tức trên biểu đồ cột bên dưới khi bạn thay đổi phân công lớp học ở bảng bên trái.
                </p>
                <div className="mt-4 pt-4 border-t border-teal-800/60 flex justify-between items-center text-xs">
                  <span>Tiến độ phân công:</span>
                  <span className="font-bold text-teal-300">{stats.assignedHours} / {stats.totalHours} giờ ({stats.percentAssigned}%)</span>
                </div>
                <div className="w-full bg-teal-950 rounded-full h-2 mt-2">
                  <div 
                    className="bg-emerald-400 h-2 rounded-full transition-all duration-500" 
                    style={{ width: `${stats.percentAssigned}%` }}
                  ></div>
                </div>
              </div>

              {/* AP Hours Bar Chart */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">Biểu đồ tổng giờ giảng / Giảng viên</h4>
                
                {/* SVG Live Bar Chart */}
                <div className="relative">
                  <div className="flex flex-col gap-3.5 pt-2 max-h-[500px] overflow-y-auto pr-1">
                    {lecturerHoursData
                      .filter(item => item.hours > 0)
                      .map((item, index) => {
                        const maxHours = Math.max(...lecturerHoursData.map(h => h.hours)) || 1;
                        const percentage = (item.hours / maxHours) * 100;
                        const isUnassigned = item.name === 'Chưa phân công';

                        return (
                          <div key={item.name} className="group flex flex-col gap-1">
                            <div className="flex justify-between items-center text-xs">
                              <span className="font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
                                {isUnassigned ? '⚠️ Chưa phân công' : `👨‍🏫 ${item.name}`}
                              </span>
                              <span className="font-extrabold text-slate-700">
                                {item.hours} <span className="text-slate-400 font-medium">giờ</span>
                              </span>
                            </div>
                            <div className="w-full bg-slate-100 rounded-lg h-3 overflow-hidden relative shadow-inner">
                              <div 
                                className={`h-full rounded-lg transition-all duration-500 ${
                                  isUnassigned ? 'bg-amber-400' : 'bg-gradient-to-r from-teal-500 to-emerald-500'
                                }`}
                                style={{ width: `${percentage}%` }}
                              ></div>
                            </div>
                          </div>
                        );
                      })}
                  </div>

                  <p className="text-[10px] text-slate-400 font-semibold text-center mt-4 italic">
                    Biểu đồ tự động cập nhật động theo thời gian thực
                  </p>
                </div>

              </div>

            </div>

          </div>
        )}


        {/* ========================================================= */}
        {/* TAB 2: PHÂN TÍCH GIẢNG VIÊN (STACKED CHARTS) */}
        {/* ========================================================= */}
        {activeTab === 'lecturer' && (
          <div className="flex flex-col gap-8 animate-fade-in" id="view_lecturer_tab">
            
            {/* Header / Intro */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">Phân tích khối lượng công việc theo Giảng viên</h2>
                  <p className="text-sm text-slate-500 mt-1">
                    Thống kê chi tiết dưới dạng biểu đồ xếp chồng. Di chuột vào các phần của cột để xem chi tiết thông tin lớp/môn học cụ thể của từng giảng viên.
                  </p>
                </div>
                
                {/* Mini Legend */}
                <div className="flex items-center gap-4 flex-wrap bg-slate-50 p-2.5 rounded-xl border border-slate-150">
                  <div className="text-xs font-bold text-slate-500">Mã màu:</div>
                  <div className="flex items-center gap-1.5 text-xs font-medium text-slate-600">
                    <span className="w-3 h-3 rounded bg-blue-500"></span> Lớp học
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-medium text-slate-600">
                    <span className="w-3 h-3 rounded bg-orange-500"></span> Môn học
                  </div>
                </div>
              </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* CHART A: TỔNG SỐ GIỜ (Stacked by Classes) */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm relative flex flex-col">
                <div className="mb-4">
                  <h3 className="text-sm font-bold text-slate-900">1. Tổng số giờ AP giảng dạy</h3>
                  <p className="text-xs text-slate-400 mt-0.5">Xếp chồng phân biệt chi tiết từng lớp học</p>
                </div>

                {/* SVG Visual Graphic Chart A */}
                <div className="relative h-[420px] w-full border-b border-slate-100 flex items-end justify-between px-2 pt-8">
                  {lecturerHoursStackedByClass.map((teacherData, index) => {
                    const maxTotal = Math.max(...lecturerHoursStackedByClass.map(t => t.total)) || 1;
                    const totalHeightPercent = (teacherData.total / maxTotal) * 85; // Max 85% height of container

                    return (
                      <div 
                        key={teacherData.lecturer} 
                        className="flex-1 flex flex-col items-center group px-1 h-full justify-end relative"
                      >
                        {/* The Stack Column */}
                        <div 
                          className="w-full sm:w-8 rounded-t-md overflow-hidden flex flex-col justify-end shadow-xs transition-transform duration-300 group-hover:scale-105"
                          style={{ height: `${totalHeightPercent}%` }}
                        >
                          {teacherData.stacks.map((stack, sIdx) => {
                            const stackHeightPercent = (stack.val / teacherData.total) * 100;
                            return (
                              <div
                                key={stack.name}
                                className="w-full hover:brightness-90 transition-all cursor-help relative"
                                style={{ 
                                  height: `${stackHeightPercent}%`,
                                  backgroundColor: stack.color
                                }}
                                onMouseEnter={(e) => {
                                  const rect = e.currentTarget.getBoundingClientRect();
                                  setHoveredHourBar({
                                    lecturer: teacherData.lecturer,
                                    details: [{ name: stack.name, val: stack.val, color: stack.color }],
                                    total: teacherData.total,
                                    x: rect.left,
                                    y: rect.top
                                  });
                                }}
                                onMouseLeave={() => setHoveredHourBar(null)}
                              ></div>
                            );
                          })}
                        </div>

                        {/* Teacher Label */}
                        <span className="text-[10px] font-extrabold text-slate-600 mt-2 rotate-45 transform origin-top-left translate-y-1 block max-w-[40px] truncate" title={teacherData.lecturer}>
                          {teacherData.lecturer}
                        </span>

                        {/* Total AP floating badge */}
                        <span className="absolute bottom-[102%] left-1/2 transform -translate-x-1/2 bg-slate-900 text-white text-[9px] font-bold px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20 shadow-sm pointer-events-none" style={{ bottom: `${totalHeightPercent + 2}%` }}>
                          {teacherData.total} giờ
                        </span>
                      </div>
                    );
                  })}

                  {/* Absolute Positioned Custom Tooltip */}
                  {hoveredHourBar && (
                    <div 
                      className="fixed bg-slate-900/95 text-white p-3 rounded-xl shadow-xl border border-slate-700/50 z-50 text-xs w-48 pointer-events-none backdrop-blur-xs"
                      style={{ 
                        left: `${hoveredHourBar.x + 30}px`, 
                        top: `${hoveredHourBar.y - 65}px` 
                      }}
                    >
                      <div className="font-extrabold border-b border-slate-700/60 pb-1 mb-1.5 text-teal-300">
                        👨‍🏫 GV: {hoveredHourBar.lecturer}
                      </div>
                      <div className="flex flex-col gap-1">
                        {hoveredHourBar.details.map((d, idx) => (
                          <div key={idx} className="flex justify-between items-center">
                            <span className="font-semibold text-slate-300">🏫 Lớp {d.name}:</span>
                            <span className="font-extrabold text-emerald-400">{d.val} giờ</span>
                          </div>
                        ))}
                        <div className="flex justify-between items-center border-t border-slate-800 pt-1 mt-1 text-[11px] font-bold">
                          <span>Tổng giảng dạy:</span>
                          <span className="text-white">{hoveredHourBar.total} giờ</span>
                        </div>
                      </div>
                    </div>
                  )}

                </div>

                <div className="mt-14 bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs text-slate-500">
                  <div className="font-bold text-slate-700 flex items-center gap-1 mb-1">
                    <Info className="w-3.5 h-3.5 text-teal-600" /> Giải thích cấu trúc
                  </div>
                  Mỗi cột dọc là một giảng viên. Độ cao cột là tổng số giờ AP. Màu sắc biểu thị số giờ AP của từng lớp học do giảng viên đó đứng lớp.
                </div>

              </div>

              {/* CHART B: TỔNG SỐ LỚP (Stacked by Subject) */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm relative flex flex-col">
                <div className="mb-4">
                  <h3 className="text-sm font-bold text-slate-900">2. Tổng số lớp giảng dạy</h3>
                  <p className="text-xs text-slate-400 mt-0.5">Xếp chồng phân biệt theo từng môn học</p>
                </div>

                {/* SVG Visual Graphic Chart B */}
                <div className="relative h-[420px] w-full border-b border-slate-100 flex items-end justify-between px-2 pt-8">
                  {lecturerClassesStackedBySubject.map((teacherData, index) => {
                    const maxTotal = Math.max(...lecturerClassesStackedBySubject.map(t => t.total)) || 1;
                    const totalHeightPercent = (teacherData.total / maxTotal) * 85;

                    return (
                      <div 
                        key={teacherData.lecturer} 
                        className="flex-1 flex flex-col items-center group px-1 h-full justify-end relative"
                      >
                        {/* The Stack Column */}
                        <div 
                          className="w-full sm:w-8 rounded-t-md overflow-hidden flex flex-col justify-end shadow-xs transition-transform duration-300 group-hover:scale-105"
                          style={{ height: `${totalHeightPercent}%` }}
                        >
                          {teacherData.stacks.map((stack, sIdx) => {
                            const stackHeightPercent = (stack.val / teacherData.total) * 100;
                            return (
                              <div
                                key={stack.name}
                                className="w-full hover:brightness-90 transition-all cursor-help relative"
                                style={{ 
                                  height: `${stackHeightPercent}%`,
                                  backgroundColor: stack.color
                                }}
                                onMouseEnter={(e) => {
                                  const rect = e.currentTarget.getBoundingClientRect();
                                  setHoveredClassBar({
                                    lecturer: teacherData.lecturer,
                                    details: [{ name: stack.name, val: stack.val, color: stack.color }],
                                    total: teacherData.total,
                                    x: rect.left,
                                    y: rect.top
                                  });
                                }}
                                onMouseLeave={() => setHoveredClassBar(null)}
                              ></div>
                            );
                          })}
                        </div>

                        {/* Teacher Label */}
                        <span className="text-[10px] font-extrabold text-slate-600 mt-2 rotate-45 transform origin-top-left translate-y-1 block max-w-[40px] truncate" title={teacherData.lecturer}>
                          {teacherData.lecturer}
                        </span>

                        {/* Total Classes floating badge */}
                        <span className="absolute bottom-[102%] left-1/2 transform -translate-x-1/2 bg-slate-900 text-white text-[9px] font-bold px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20 shadow-sm pointer-events-none" style={{ bottom: `${totalHeightPercent + 2}%` }}>
                          {teacherData.total} lớp
                        </span>
                      </div>
                    );
                  })}

                  {/* Absolute Positioned Custom Tooltip */}
                  {hoveredClassBar && (
                    <div 
                      className="fixed bg-slate-900/95 text-white p-3 rounded-xl shadow-xl border border-slate-700/50 z-50 text-xs w-52 pointer-events-none backdrop-blur-xs"
                      style={{ 
                        left: `${hoveredClassBar.x + 30}px`, 
                        top: `${hoveredClassBar.y - 65}px` 
                      }}
                    >
                      <div className="font-extrabold border-b border-slate-700/60 pb-1 mb-1.5 text-amber-300">
                        👨‍🏫 GV: {hoveredClassBar.lecturer}
                      </div>
                      <div className="flex flex-col gap-1">
                        {hoveredClassBar.details.map((d, idx) => (
                          <div key={idx} className="flex flex-col">
                            <span className="font-bold text-slate-300 block">📚 Môn {d.name}:</span>
                            <span className="text-[11px] font-bold text-emerald-400 pl-3">Dạy {d.val} lớp</span>
                          </div>
                        ))}
                        <div className="flex justify-between items-center border-t border-slate-800 pt-1 mt-1 text-[11px] font-bold">
                          <span>Tổng số lớp dạy:</span>
                          <span className="text-white">{hoveredClassBar.total} lớp</span>
                        </div>
                      </div>
                    </div>
                  )}

                </div>

                <div className="mt-14 bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs text-slate-500">
                  <div className="font-bold text-slate-700 flex items-center gap-1 mb-1">
                    <Info className="w-3.5 h-3.5 text-teal-600" /> Giải thích cấu trúc
                  </div>
                  Mỗi cột là một giảng viên. Độ cao của cột biểu thị tổng số lượng lớp mà giảng viên phụ trách. Màu sắc phân biệt các môn học khác nhau.
                </div>

              </div>

              {/* CHART C: TỔNG SỐ MÔN (Stacked by Class) */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm relative flex flex-col">
                <div className="mb-4">
                  <h3 className="text-sm font-bold text-slate-900">3. Tổng số môn phụ trách</h3>
                  <p className="text-xs text-slate-400 mt-0.5">Xếp chồng phân biệt chi tiết theo lớp học</p>
                </div>

                {/* SVG Visual Graphic Chart C */}
                <div className="relative h-[420px] w-full border-b border-slate-100 flex items-end justify-between px-2 pt-8">
                  {lecturerSubjectsStackedByClass.map((teacherData, index) => {
                    const maxTotal = Math.max(...lecturerSubjectsStackedByClass.map(t => t.total)) || 1;
                    const totalHeightPercent = (teacherData.total / maxTotal) * 85;

                    return (
                      <div 
                        key={teacherData.lecturer} 
                        className="flex-1 flex flex-col items-center group px-1 h-full justify-end relative"
                      >
                        {/* The Stack Column */}
                        <div 
                          className="w-full sm:w-8 rounded-t-md overflow-hidden flex flex-col justify-end shadow-xs transition-transform duration-300 group-hover:scale-105"
                          style={{ height: `${totalHeightPercent}%` }}
                        >
                          {teacherData.stacks.map((stack, sIdx) => {
                            const stackHeightPercent = (stack.val / teacherData.total) * 100;
                            return (
                              <div
                                key={stack.name}
                                className="w-full hover:brightness-90 transition-all cursor-help relative"
                                style={{ 
                                  height: `${stackHeightPercent}%`,
                                  backgroundColor: stack.color
                                }}
                                onMouseEnter={(e) => {
                                  const rect = e.currentTarget.getBoundingClientRect();
                                  setHoveredSubjectBar({
                                    lecturer: teacherData.lecturer,
                                    details: [{ name: stack.name, val: stack.val, color: stack.color }],
                                    total: teacherData.total,
                                    x: rect.left,
                                    y: rect.top
                                  });
                                }}
                                onMouseLeave={() => setHoveredSubjectBar(null)}
                              ></div>
                            );
                          })}
                        </div>

                        {/* Teacher Label */}
                        <span className="text-[10px] font-extrabold text-slate-600 mt-2 rotate-45 transform origin-top-left translate-y-1 block max-w-[40px] truncate" title={teacherData.lecturer}>
                          {teacherData.lecturer}
                        </span>

                        {/* Total Subjects floating badge */}
                        <span className="absolute bottom-[102%] left-1/2 transform -translate-x-1/2 bg-slate-900 text-white text-[9px] font-bold px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20 shadow-sm pointer-events-none" style={{ bottom: `${totalHeightPercent + 2}%` }}>
                          {teacherData.total} môn
                        </span>
                      </div>
                    );
                  })}

                  {/* Absolute Positioned Custom Tooltip */}
                  {hoveredSubjectBar && (
                    <div 
                      className="fixed bg-slate-900/95 text-white p-3 rounded-xl shadow-xl border border-slate-700/50 z-50 text-xs w-48 pointer-events-none backdrop-blur-xs"
                      style={{ 
                        left: `${hoveredSubjectBar.x + 30}px`, 
                        top: `${hoveredSubjectBar.y - 65}px` 
                      }}
                    >
                      <div className="font-extrabold border-b border-slate-700/60 pb-1 mb-1.5 text-purple-300">
                        👨‍🏫 GV: {hoveredSubjectBar.lecturer}
                      </div>
                      <div className="flex flex-col gap-1">
                        {hoveredSubjectBar.details.map((d, idx) => (
                          <div key={idx} className="flex justify-between items-center">
                            <span className="font-semibold text-slate-300">🏫 Lớp {d.name}:</span>
                            <span className="font-extrabold text-emerald-400">{d.val} môn</span>
                          </div>
                        ))}
                        <div className="flex justify-between items-center border-t border-slate-800 pt-1 mt-1 text-[11px] font-bold">
                          <span>Tổng số môn dạy:</span>
                          <span className="text-white">{hoveredSubjectBar.total} môn</span>
                        </div>
                      </div>
                    </div>
                  )}

                </div>

                <div className="mt-14 bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs text-slate-500">
                  <div className="font-bold text-slate-700 flex items-center gap-1 mb-1">
                    <Info className="w-3.5 h-3.5 text-teal-600" /> Giải thích cấu trúc
                  </div>
                  Mỗi cột là một giảng viên. Độ cao của cột đại diện cho tổng số lượng môn học giảng dạy. Màu sắc hiển thị tỉ lệ phân chia theo lớp học.
                </div>

              </div>

            </div>

          </div>
        )}


        {/* ========================================================= */}
        {/* TAB 3: PHÂN TÍCH THEO TOÀN BỘ CÁC MÔN HỌC */}
        {/* ========================================================= */}
        {activeTab === 'subject' && (
          <div className="flex flex-col gap-8 animate-fade-in" id="view_subject_tab">
            
            {/* Quick Answer Focus Widget */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Highlight 1: Subject with most lecturers */}
              <div className="bg-emerald-50 border border-emerald-200 p-6 rounded-2xl flex items-start gap-4 shadow-xs">
                <div className="p-3.5 bg-emerald-100 text-emerald-800 rounded-xl">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 block">Môn có nhiều giảng viên dạy nhất</span>
                  <h3 className="text-lg font-black text-emerald-950 mt-1">
                    {subjectAnalysisData.mostLecturerSubj ? `${subjectAnalysisData.mostLecturerSubj.code} - ${subjectAnalysisData.mostLecturerSubj.name}` : 'N/A'}
                  </h3>
                  <p className="text-xs text-emerald-700 mt-2 leading-relaxed">
                    Được đóng góp giảng dạy bởi <strong className="text-emerald-900 font-extrabold">{subjectAnalysisData.mostLecturerSubj?.lecturersCount} giảng viên</strong> khác nhau: {subjectAnalysisData.mostLecturerSubj?.lecturerList}. Điều này phản ánh tính đa dạng và nhu cầu chuyên môn cao của môn học.
                  </p>
                </div>
              </div>

              {/* Highlight 2: Subject with least lecturers */}
              <div className="bg-amber-50 border border-amber-200 p-6 rounded-2xl flex items-start gap-4 shadow-xs">
                <div className="p-3.5 bg-amber-100 text-amber-800 rounded-xl">
                  <AlertTriangle className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-600 block">Môn có ít giảng viên dạy nhất</span>
                  <h3 className="text-lg font-black text-amber-950 mt-1">
                    {subjectAnalysisData.leastLecturerSubj ? `${subjectAnalysisData.leastLecturerSubj.code} - ${subjectAnalysisData.leastLecturerSubj.name}` : 'N/A'}
                  </h3>
                  <p className="text-xs text-amber-700 mt-2 leading-relaxed">
                    Hiện chỉ được đảm nhận bởi <strong className="text-amber-900 font-extrabold">{subjectAnalysisData.leastLecturerSubj?.lecturersCount} giảng viên</strong> ({subjectAnalysisData.leastLecturerSubj?.lecturerList}). Trưởng bộ môn cần theo dõi để có kế hoạch bồi dưỡng thêm giảng viên dự phòng, tránh rủi ro thiếu hụt giảng viên.
                  </p>
                </div>
              </div>

            </div>

            {/* Main Visual Comparison Split Chart */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <h3 className="text-base font-bold text-slate-900 mb-6">Trực quan hóa so sánh: Số lượng Sinh viên cần học và Số lượng Giảng viên dạy</h3>
              
              <div className="space-y-6">
                {subjectAnalysisData.list.map(item => {
                  const maxStudents = Math.max(...subjectAnalysisData.list.map(s => s.totalStudents)) || 1;
                  const studentsPercent = (item.totalStudents / maxStudents) * 100;
                  
                  // Calculate percentage for lecturer bar (max is usually 4 or 5)
                  const maxLecturers = Math.max(...subjectAnalysisData.list.map(s => s.lecturersCount)) || 1;
                  const lecturersPercent = (item.lecturersCount / maxLecturers) * 100;

                  return (
                    <div key={item.code} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center pb-4 border-b border-slate-100 hover:bg-slate-50/40 p-2 rounded-xl transition-all">
                      
                      {/* Subject Metadata */}
                      <div className="md:col-span-3">
                        <div className="flex items-center gap-2">
                          <span 
                            className="text-xs font-bold px-2 py-0.5 rounded text-white block whitespace-nowrap"
                            style={{ backgroundColor: getSubjectColor(item.code) }}
                          >
                            {item.code}
                          </span>
                          <span className="text-xs font-extrabold text-slate-500">
                            ({item.classes.length} Lớp)
                          </span>
                        </div>
                        <h4 className="text-sm font-bold text-slate-900 mt-1 line-clamp-1" title={item.name}>
                          {item.name}
                        </h4>
                      </div>

                      {/* Bar 1: Total Students enrollment */}
                      <div className="md:col-span-5 flex flex-col gap-1">
                        <div className="flex justify-between items-center text-[10px] font-bold text-slate-500">
                          <span>👥 Tổng số sinh viên cần học:</span>
                          <span className="text-slate-800 font-extrabold">{item.totalStudents} sv</span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                          <div 
                            className="bg-blue-500 h-2.5 rounded-full transition-all duration-500" 
                            style={{ width: `${studentsPercent}%` }}
                          ></div>
                        </div>
                      </div>

                      {/* Bar 2: Lecturers Taught */}
                      <div className="md:col-span-4 flex flex-col gap-1">
                        <div className="flex justify-between items-center text-[10px] font-bold text-slate-500">
                          <span>👨‍🏫 Số giảng viên giảng dạy:</span>
                          <span className="text-teal-700 font-extrabold">{item.lecturersCount} GV</span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                          <div 
                            className="bg-teal-500 h-2.5 rounded-full transition-all duration-500" 
                            style={{ width: `${lecturersPercent}%` }}
                          ></div>
                        </div>
                        <span className="text-[10px] text-slate-400 font-semibold truncate block mt-0.5">
                          GV phụ trách: {item.lecturerList}
                        </span>
                      </div>

                    </div>
                  );
                })}
              </div>

            </div>

          </div>
        )}


        {/* ========================================================= */}
        {/* TAB 4: PHÂN TÍCH THEO CÁC LỚP HỌC (CONFLICT & DETAILED OVERVIEW) */}
        {/* ========================================================= */}
        {activeTab === 'class' && (
          <div className="flex flex-col gap-8 animate-fade-in" id="view_class_tab">
            
            {/* Warning Alert Banner */}
            {classesWithConflicts.length > 0 ? (
              <div className="bg-amber-50 border border-amber-200 p-5 rounded-2xl flex items-start gap-4 shadow-xs" id="conflict_alert_banner">
                <div className="p-3 bg-amber-100 text-amber-800 rounded-xl flex-shrink-0 animate-pulse">
                  <AlertTriangle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-amber-950">Phát hiện trùng lặp giảng viên dạy học!</h3>
                  <p className="text-sm text-amber-700 mt-1 leading-relaxed">
                    Hiện đang có <strong className="font-extrabold text-amber-900">{classesWithConflicts.length} lớp học</strong> bị hiện tượng một thầy cô đứng lớp giảng dạy từ <strong>2 môn học khác nhau trở lên</strong> trong cùng một học kỳ cho lớp đó. Vui lòng kiểm tra danh sách chi tiết được cảnh báo đỏ ở bên dưới và điều chỉnh lại nếu cần thiết.
                  </p>
                </div>
              </div>
            ) : (
              <div className="bg-emerald-50 border border-emerald-200 p-5 rounded-2xl flex items-start gap-4 shadow-xs" id="no_conflict_banner">
                <div className="p-3 bg-emerald-100 text-emerald-800 rounded-xl flex-shrink-0">
                  <Check className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-emerald-950">Lịch phân công hoàn hảo!</h3>
                  <p className="text-sm text-emerald-700 mt-1">
                    Không có bất kỳ trường hợp trùng lặp giảng viên nào giảng dạy nhiều môn cho cùng một lớp học trong kỳ này.
                  </p>
                </div>
              </div>
            )}

            {/* Class Explorer Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="classes_explorer_grid">
              {classAnalysisData.map(classData => (
                <div 
                  key={classData.className}
                  className={`bg-white p-5 rounded-2xl border transition-all duration-300 relative ${
                    classData.hasConflict 
                      ? 'border-amber-300 shadow-sm shadow-amber-50 bg-amber-50/5' 
                      : 'border-slate-200 hover:border-slate-300 shadow-xs'
                  }`}
                >
                  
                  {/* Card Title & Header */}
                  <div className="flex justify-between items-start gap-2 border-b border-slate-100 pb-3 mb-4">
                    <div>
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">Lớp học</span>
                      <h4 className="text-lg font-black text-slate-900">{classData.className}</h4>
                    </div>
                    
                    <span className={`text-xs font-extrabold px-2.5 py-1 rounded-full border ${
                      classData.hasConflict 
                        ? 'bg-amber-100 text-amber-800 border-amber-200' 
                        : 'bg-slate-100 text-slate-700 border-slate-200'
                    }`}>
                      {classData.totalSubjects} Môn học
                    </span>
                  </div>

                  {/* List of Subjects in this class */}
                  <div className="space-y-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">Môn & Giáo viên kỳ này:</span>
                    {classData.subjects.map((subj, idx) => {
                      const isUnassigned = subj.giangVien === 'Chưa phân công';
                      return (
                        <div key={idx} className="flex justify-between items-center text-xs p-2 rounded-lg bg-slate-50 border border-slate-100 hover:bg-slate-100/50 transition-all">
                          <div className="flex-1 min-w-0 pr-2">
                            <span className="font-extrabold text-slate-800 block truncate" title={subj.tenMon}>
                              {subj.mon}: {subj.tenMon}
                            </span>
                            <span className="text-[10px] text-slate-400 block mt-0.5">Số giờ AP: {subj.hours} giờ</span>
                          </div>
                          <span className={`font-bold px-2 py-0.5 rounded-sm flex-shrink-0 text-[10px] ${
                            isUnassigned 
                              ? 'bg-amber-100 text-amber-800' 
                              : 'bg-teal-50 text-teal-800'
                          }`}>
                            {subj.giangVien}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Repeating Lecturer Highlight Alerts */}
                  {classData.hasConflict && (
                    <div className="mt-5 p-3.5 bg-amber-50 rounded-xl border border-amber-200/60 text-xs">
                      <div className="flex items-center gap-1.5 font-extrabold text-amber-800 mb-1">
                        <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0" />
                        <span>Trùng lặp GV đứng lớp:</span>
                      </div>
                      <div className="space-y-2 mt-2">
                        {classData.repeatingLecturers.map((rep, idx) => (
                          <div key={idx} className="text-slate-700 pl-1 border-l-2 border-amber-400">
                            Thầy/Cô <strong className="text-slate-900 font-extrabold">{rep.name}</strong> giảng dạy <strong>{rep.count} môn</strong> khác nhau:
                            <div className="flex flex-wrap gap-1 mt-1">
                              {rep.subjects.map(s => (
                                <span key={s} className="bg-amber-100/85 text-amber-900 text-[9px] font-extrabold px-1.5 py-0.2 rounded border border-amber-200">
                                  {s}
                                </span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                </div>
              ))}
            </div>

          </div>
        )}

      </main>


      {/* ========================================================= */}
      {/* ADD LECTURER INLINE MODAL DIALOG */}
      {/* ========================================================= */}
      {isAddingLecturer && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xl max-w-sm w-full mx-4 transform transition-all">
            <h3 className="text-base font-extrabold text-slate-900 mb-2">Thêm giảng viên mới</h3>
            <p className="text-xs text-slate-500 mb-4">
              Nhập mã định danh/tên viết tắt của giảng viên mới để bổ sung vào hệ thống lựa chọn phân công.
            </p>
            <input
              type="text"
              placeholder="Ví dụ: hahuong, omar2, etc..."
              value={newLecturerName}
              onChange={(e) => setNewLecturerName(e.target.value)}
              className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 mb-4 font-semibold text-slate-800"
            />
            <div className="flex justify-end gap-2.5">
              <button
                onClick={() => { setIsAddingLecturer(false); setNewLecturerName(''); }}
                className="px-4 py-2 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
              >
                Hủy bỏ
              </button>
              <button
                onClick={handleCreateNewLecturer}
                className="px-4 py-2 text-xs font-bold text-white bg-teal-600 rounded-xl hover:bg-teal-700 transition-all shadow-md shadow-teal-100"
              >
                Xác nhận thêm
              </button>
            </div>
          </div>
        </div>
      )}


      {/* ========================================================= */}
      {/* ADD NEW ROW MODAL DIALOG */}
      {/* ========================================================= */}
      {isAddRowModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-2xl max-w-lg w-full mx-4 transform transition-all overflow-y-auto max-h-[90vh]">
            
            <div className="flex justify-between items-center border-b border-slate-100 pb-3 mb-5">
              <h3 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
                <Plus className="w-5 h-5 text-teal-600" /> Thêm lớp & môn học phân công mới
              </h3>
              <button 
                onClick={() => setIsAddRowModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddRowSubmit} className="space-y-4 text-xs font-semibold text-slate-600">
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1.5 text-slate-500">Mã môn học *</label>
                  <input
                    type="text"
                    required
                    placeholder="Mã môn, vd: AMD201"
                    value={newRowForm.mon}
                    onChange={(e) => setNewRowForm(prev => ({ ...prev, mon: e.target.value }))}
                    className="w-full px-3 py-2 border border-slate-200 bg-slate-50 rounded-xl text-slate-800 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
                <div>
                  <label className="block mb-1.5 text-slate-500">Lớp học *</label>
                  <input
                    type="text"
                    required
                    placeholder="Tên lớp, vd: CO1305"
                    value={newRowForm.lop}
                    onChange={(e) => setNewRowForm(prev => ({ ...prev, lop: e.target.value }))}
                    className="w-full px-3 py-2 border border-slate-200 bg-slate-50 rounded-xl text-slate-800 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>

              <div>
                <label className="block mb-1.5 text-slate-500">Tên đầy đủ môn học *</label>
                <input
                  type="text"
                  required
                  placeholder="Nhập tên môn học..."
                  value={newRowForm.tenMon}
                  onChange={(e) => setNewRowForm(prev => ({ ...prev, tenMon: e.target.value }))}
                  className="w-full px-3 py-2 border border-slate-200 bg-slate-50 rounded-xl text-slate-800 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1.5 text-slate-500">Chuyên ngành</label>
                  <input
                    type="text"
                    placeholder="vd: 3+0 COMP&AI"
                    value={newRowForm.chuyenNganh}
                    onChange={(e) => setNewRowForm(prev => ({ ...prev, chuyenNganh: e.target.value }))}
                    className="w-full px-3 py-2 border border-slate-200 bg-slate-50 rounded-xl text-slate-800 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
                <div>
                  <label className="block mb-1.5 text-slate-500">Phân đoạn (Part)</label>
                  <input
                    type="text"
                    placeholder="vd: 2 Part"
                    value={newRowForm.part}
                    onChange={(e) => setNewRowForm(prev => ({ ...prev, part: e.target.value }))}
                    className="w-full px-3 py-2 border border-slate-200 bg-slate-50 rounded-xl text-slate-800 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1.5 text-slate-500">Số lượng sinh viên cần học</label>
                  <input
                    type="number"
                    min="1"
                    value={newRowForm.soSinhVien}
                    onChange={(e) => setNewRowForm(prev => ({ ...prev, soSinhVien: e.target.value }))}
                    className="w-full px-3 py-2 border border-slate-200 bg-slate-50 rounded-xl text-slate-800 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
                <div>
                  <label className="block mb-1.5 text-slate-500">Số giờ AP môn học</label>
                  <input
                    type="number"
                    min="1"
                    value={newRowForm.soGioAP}
                    onChange={(e) => setNewRowForm(prev => ({ ...prev, soGioAP: e.target.value }))}
                    className="w-full px-3 py-2 border border-slate-200 bg-slate-50 rounded-xl text-slate-800 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>

              <div>
                <label className="block mb-1.5 text-slate-500">Giảng viên giảng dạy</label>
                <select
                  value={newRowForm.giangVien}
                  onChange={(e) => setNewRowForm(prev => ({ ...prev, giangVien: e.target.value }))}
                  className="w-full px-3 py-2 border border-slate-200 bg-slate-50 rounded-xl text-slate-800 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  <option value="Chưa phân công">⚠️ Chưa phân công</option>
                  {combinedLecturerList.map(name => (
                    <option key={name} value={name}>👨‍🏫 {name}</option>
                  ))}
                </select>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsAddRowModalOpen(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors"
                >
                  Đóng lại
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-teal-600 hover:bg-teal-700 rounded-xl shadow-md transition-all"
                >
                  Xác nhận thêm mới
                </button>
              </div>

            </form>

          </div>
        </div>
      )}


      {/* Elegant minimalist footer */}
      <footer className="bg-white border-t border-slate-200 py-6 mt-12 text-center" id="main_footer">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs text-slate-400 font-semibold tracking-wide">
            © 2026 Phần mềm Quản lý Phân công Lịch dạy Bộ môn • Trực quan hóa Biểu đồ Stacked & Phân tích cảnh báo trùng lặp.
          </p>
        </div>
      </footer>

    </div>
  );
}
