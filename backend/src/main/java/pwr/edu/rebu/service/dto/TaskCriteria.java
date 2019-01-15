package pwr.edu.rebu.service.dto;

import java.io.Serializable;
import java.util.Objects;
import pwr.edu.rebu.domain.enumeration.TaskStatus;
import io.github.jhipster.service.filter.BooleanFilter;
import io.github.jhipster.service.filter.DoubleFilter;
import io.github.jhipster.service.filter.Filter;
import io.github.jhipster.service.filter.FloatFilter;
import io.github.jhipster.service.filter.IntegerFilter;
import io.github.jhipster.service.filter.LongFilter;
import io.github.jhipster.service.filter.StringFilter;

/**
 * Criteria class for the Task entity. This class is used in TaskResource to
 * receive all the possible filtering options from the Http GET request parameters.
 * For example the following could be a valid requests:
 * <code> /tasks?id.greaterThan=5&amp;attr1.contains=something&amp;attr2.specified=false</code>
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
public class TaskCriteria implements Serializable {
    /**
     * Class for filtering TaskStatus
     */
    public static class TaskStatusFilter extends Filter<TaskStatus> {
    }

    private static final long serialVersionUID = 1L;

    private LongFilter id;

    private StringFilter title;

    private StringFilter owner;

    private LongFilter reward;

    private TaskStatusFilter status;

    private StringFilter assignee;

    private DoubleFilter latitude;

    private DoubleFilter longitude;

    private StringFilter description;

    public LongFilter getId() {
        return id;
    }

    public void setId(LongFilter id) {
        this.id = id;
    }

    public StringFilter getTitle() {
        return title;
    }

    public void setTitle(StringFilter title) {
        this.title = title;
    }

    public StringFilter getOwner() {
        return owner;
    }

    public void setOwner(StringFilter owner) {
        this.owner = owner;
    }

    public LongFilter getReward() {
        return reward;
    }

    public void setReward(LongFilter reward) {
        this.reward = reward;
    }

    public TaskStatusFilter getStatus() {
        return status;
    }

    public void setStatus(TaskStatusFilter status) {
        this.status = status;
    }

    public StringFilter getAssignee() {
        return assignee;
    }

    public void setAssignee(StringFilter assignee) {
        this.assignee = assignee;
    }

    public DoubleFilter getLatitude() {
        return latitude;
    }

    public void setLatitude(DoubleFilter latitude) {
        this.latitude = latitude;
    }

    public DoubleFilter getLongitude() {
        return longitude;
    }

    public void setLongitude(DoubleFilter longitude) {
        this.longitude = longitude;
    }

    public StringFilter getDescription() {
        return description;
    }

    public void setDescription(StringFilter description) {
        this.description = description;
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        final TaskCriteria that = (TaskCriteria) o;
        return
            Objects.equals(id, that.id) &&
            Objects.equals(title, that.title) &&
            Objects.equals(owner, that.owner) &&
            Objects.equals(reward, that.reward) &&
            Objects.equals(status, that.status) &&
            Objects.equals(assignee, that.assignee) &&
            Objects.equals(latitude, that.latitude) &&
            Objects.equals(longitude, that.longitude) &&
            Objects.equals(description, that.description);
    }

    @Override
    public int hashCode() {
        return Objects.hash(
        id,
        title,
        owner,
        reward,
        status,
        assignee,
        latitude,
        longitude,
        description
        );
    }

    @Override
    public String toString() {
        return "TaskCriteria{" +
                (id != null ? "id=" + id + ", " : "") +
                (title != null ? "title=" + title + ", " : "") +
                (owner != null ? "owner=" + owner + ", " : "") +
                (reward != null ? "reward=" + reward + ", " : "") +
                (status != null ? "status=" + status + ", " : "") +
                (assignee != null ? "assignee=" + assignee + ", " : "") +
                (latitude != null ? "latitude=" + latitude + ", " : "") +
                (longitude != null ? "longitude=" + longitude + ", " : "") +
                (description != null ? "description=" + description + ", " : "") +
            "}";
    }

}
