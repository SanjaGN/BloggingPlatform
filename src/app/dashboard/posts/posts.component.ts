import {Component, OnInit} from '@angular/core';
import {DashboardService} from "../dashboard.service";
import {Post} from "../../models/post.model";
import {Comment} from "../../models/comment.model";
import {AuthService} from "../../auth/auth.service";

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss'
})
export class PostsComponent implements OnInit{
  posts: Post[] = [];
  isLoading: boolean = false;
  currentUserId: number | undefined;

  constructor(private dashboardService: DashboardService,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    this.getUserId();

    if(this.currentUserId) {
      this.fetchPostsData();
    }
  }

  fetchPostsData() {
    this.isLoading = true;
    this.dashboardService.fetchPosts(this.currentUserId).subscribe(
      (response: Post[] | Post) => {

        this.isLoading = false;
        if (Array.isArray(response)) {
          this.posts = response.filter(post => post.userId === this.currentUserId);
        } else if (response instanceof Object) {
          this.posts = response.userId === this.currentUserId ? [response] : [];
        }
      }, (error) => {
        console.log('Failed to fetch albums list', error);
      }
    )
  }

  getUserId() {
    this.authService.currentUser.subscribe(user => {
      this.currentUserId = user?.id;
    });
  }

  loadComments(post: Post) {
    post.showComments = !post.showComments;
    if(post.showComments) {
      this.dashboardService.fetchComments(post.id).subscribe(
        (response: Comment[]) => {
          post.comments = response;
        }, (error) => {
          console.log('Failed to fetch albums list', error);
        }
      )
    }
  }

  deletePost(post: Post) {
    this.dashboardService.deletePost(post.id).subscribe(
      () => {
        this.posts = this.posts.filter(p => p.id !== post.id);
      }, (error) => {
        console.log('Failed to fetch albums list', error);
      }
    )
  }
}
