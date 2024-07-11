<!-- resources/views/students/show.blade.php -->
@extends('layout')

@section('content')
<div class="container mt-5">
    <h2>Student Details</h2>
    <div class="card">
        <div class="card-body">
            <h5 class="card-title">{{ $student->name }}</h5>
            <h6 class="card-subtitle mb-2 text-muted">{{ $student->email }}</h6>
            <p class="card-text">Age: {{ $student->age }}</p>
            <a href="{{ route('students.index') }}" class="card-link btn btn-info">Back to list</a>
            <a href="{{ route('students.edit', $student->id) }}" class="card-link btn btn-warning">Edit</a>
            <form action="{{ route('students.destroy', $student->id) }}" method="POST" style="display:inline-block;">
                @csrf
                @method('DELETE')
                <button type="submit" class="btn btn-danger">Delete</button>
            </form>
        </div>
    </div>
</div>
@endsection